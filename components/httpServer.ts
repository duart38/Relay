import {
  listenAndServe,
  ServerRequest,
  listenAndServeTLS,
} from "https://deno.land/std/http/server.ts";
import {
  constructHeaders,
  defaultHeaders,
  respondError,
} from "../actions/respond.ts";
import { loadConfiguration } from "../actions/loadConfiguration.ts";
import { Connection } from "../enums/connectionTypes.ts";
import { HTTPModelMethod } from "../interfaces/model.ts";
import { print, ObjectSize } from "../actions/logging.ts";
import { Verbosity } from "../enums/verbosity.ts";
import { verbosity, portnum, TLS } from "../CLA.ts";
import { decodeBody } from "../actions/decoding.ts";
import { checkRequiredHeaders } from "../actions/filtering.ts";
import { Status } from "https://deno.land/std/http/http_status.ts";

export default class httpServer {
  constructor() {
    this.init();
  }

  private async init() {
    const port: number = portnum();
    //serveTLS
    const hasTLS = TLS() ? true : false;
    const server = hasTLS
      ? listenAndServeTLS(
        { port, certFile: TLS()?.cert || "", keyFile: TLS()?.key || "" },
        this.handleRequest,
      )
      : listenAndServe({ port }, this.handleRequest);
    print(
      `[+] ${hasTLS ? "TLS" : "UNSECURED"} Server running on port: ${port}`,
      Verbosity.LOW,
    );
  }

  /**
   * Forwards HTTP requests based on config..
   */
  private static async forward(
    configuration: HTTPModelMethod,
    headers: Headers,
    body: Uint8Array | string,
  ): Promise<Response> {
    print(`[->] Forwarding to (${configuration.route})`, Verbosity.MEDIUM);
    print(`| With configuration:`, Verbosity.HIGH);
    print(configuration, Verbosity.HIGH);
    print(`| Body:`, Verbosity.HIGH);
    print(body || " - none", Verbosity.HIGH);
    print(`| Headers:`, Verbosity.HIGH);
    print(headers || " - none", Verbosity.HIGH);

        return await fetch(configuration.route, {
          method: configuration.type,
          headers: headers, //headersToObject(headers),
          body
      });
  }

  /**
   * The first entry point for an incoming request.
   * @param req 
   */
  private async handleRequest(req: ServerRequest) {

    try{
      performance.mark(`start_http_${req.url}`);
      print(`[+] ${req.method} - ${req.url}`, Verbosity.LOW);
      if (req.method === "OPTIONS") {
        req.respond({ headers: defaultHeaders(req) });
      }
      /* REQ FORMAT:
        http:www.test.com/<model>/<method_in_model>/......params......
      */
      const urlModel = req.url.split("/")[1] + ".ts"; // file name (eg. about.ts)
      const urlMethod = req.url.split("/")[2].split("?")[0]; // method in the file name (getconfig: {})
      const urlParameters = req.url.split("/").slice(3); // anything that comes after our pre-defined base routing system. (eg /12/minified/<others>)
  
      const config = <HTTPModelMethod> (
        await loadConfiguration(urlModel, urlMethod, urlParameters, req, Connection.HTTP)
      );
  
      if (!config) return respondError(req, Status.NotFound) // config does not exists
      if (req.method !== config.type) return respondError(req, Status.MethodNotAllowed)  // method in config does not match the sent request
      if (checkRequiredHeaders(config, req.headers) === false) return respondError(req, Status.PreconditionFailed)
  
      let decoded = await decodeBody(config, req.body);
  
      httpServer.forward(config, constructHeaders(req, config), decoded)
        .then(async (relayValue) => {
          print(
            `[+] Relay server responded with the below.. forwarding`,
            Verbosity.HIGH,
          );
          print(relayValue, Verbosity.HIGH);
          performance.mark(`end_http_${req.url}`);
          print(
            `| Duration: ${
              performance.measure(
                req.url,
                `start_http_${req.url}`,
                `end_http_${req.url}`,
              ).duration
            } ms`,
            Verbosity.MEDIUM,
          );
          // console.log(req.headers);
          if (verbosity() >= Verbosity.MEDIUM) {
            console.log(
              `Incoming payload size: ${ObjectSize(req.body) +
                ObjectSize(req.headers)} bytes`,
            );
            console.log(
              `Outgoing payload size: ${ObjectSize(relayValue.body) +
                ObjectSize(relayValue.headers)} bytes`,
            );
          }
  
          /**
           * Decoded body or text..
           */
          const body = config.decodeResponse ? JSON.stringify(await relayValue.json()) : await relayValue.text();
          await req.respond({
            body:  body || undefined,
            headers: constructHeaders(req, config),
          });
        })
        .catch((err) => {
          performance.mark(req.url);
          print(err, Verbosity.HIGH);
          return respondError(req, Status.InternalServerError)
        });
    }catch(e){
      print(e, Verbosity.HIGH);
      respondError(req, Status.InternalServerError)
    }
  }
}
