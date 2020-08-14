import {
  listenAndServe,
  ServerRequest,
  listenAndServeTLS,
} from "https://deno.land/std/http/server.ts";
import { constructHeaders, defaultHeaders, headersToObject } from "../actions/respond.ts";
import { loadConfiguration } from "../actions/loadConfiguration.ts";
import { Connection } from "../enums/connectionTypes.ts";
import { HTTPModelMethod } from "../interfaces/model.ts";

import axiod from "https://deno.land/x/axiod@0.20.0-0/mod.ts";
import { HTTP } from "../enums/httpTypes.ts";
import { print, ObjectSize } from "../actions/logging.ts";
import { Verbosity } from "../enums/verbosity.ts";
import { verbosity, portnum, TLS } from "../CLA.ts";
import { decodeBody } from "../actions/decoding.ts";
import { IAxiodResponse } from "https://deno.land/x/axiod@0.20.0-0/interfaces.ts";

export default class httpServer {
  constructor() {
    this.init();
  }

  private async init(){
    const port: number = portnum();
    //serveTLS
    const hasTLS = TLS() ? true : false;
    const server = hasTLS
      ? listenAndServeTLS(
          { port, certFile: TLS()?.cert || "", keyFile: TLS()?.key || "" },
          this.handleRequest
        )
      : listenAndServe({ port }, this.handleRequest);
    print(
      `[+] ${hasTLS ? "TLS" : "UNSC"} Server running on port: ${port}`,
      Verbosity.LOW
    );
  }

  /**
   * Forwards HTTP requests based on config..
   */
  private static async forward(
    configuration: HTTPModelMethod,
    headers: Headers,
    body: Uint8Array | string
  ): Promise<IAxiodResponse> {
    print(`[->] Forwarding to (${configuration.route})`, Verbosity.MEDIUM);
    print(`| With configuration:`, Verbosity.HIGH);
    print(configuration, Verbosity.HIGH);
    print(`| Body:`, Verbosity.HIGH);
    print(body || " - none", Verbosity.HIGH);
    print(`| Headers:`, Verbosity.HIGH);
    print(headers || " - none", Verbosity.HIGH);
    
    switch (configuration.type) {
      case HTTP.GET:
        return await axiod.get(configuration.route, { headers: headersToObject(headers) });
      case HTTP.POST:
        return await axiod.post(
          configuration.route,
          typeof body === "string" ? JSON.parse(body) : body,
          { headers: headersToObject(headers) }
        );
      default:
        return await axiod.get(configuration.route);
    }
  }

  private async handleRequest(req: ServerRequest) {
    performance.mark(`start_http_${req.url}`);
    print(`[+] ${req.method} - ${req.url}`, Verbosity.LOW);
    if (req.method === "OPTIONS") {
      req.respond({ headers: defaultHeaders(req) });
    }
    const urlMethod = req.url
      .split("/")
      [req.url.split("/").length - 1].split("?")[0]; // last piece of url (test/some/stuff) -> (stuff)
    const urlModel = req.url.split("/")[req.url.split("/").length - 2] + ".ts";

    const config = <HTTPModelMethod>(
      await loadConfiguration(urlModel, urlMethod, req, Connection.HTTP)
    );

    if (!config){
      return req.respond({
        body: "404",
        headers: defaultHeaders(req),
      });
    }

    if (req.method !== config.type){
      return req.respond({
        body: JSON.stringify({ ERROR: "error" }),
        headers: constructHeaders(req, config),
      });
    }

    let decoded = await decodeBody(config, req.body);
    httpServer.forward(config, constructHeaders(req, config), decoded)
      .then((relayValue) => {
        print(
          `[+] Relay server responded with the below.. forwarding`,
          Verbosity.HIGH
        );
        print(relayValue, Verbosity.HIGH);
        performance.mark(`end_http_${req.url}`);
        print(
          `| Duration: ${
            performance.measure(
              req.url,
              `start_http_${req.url}`,
              `end_http_${req.url}`
            ).duration
          } ms`,
          Verbosity.MEDIUM
        );
        // console.log(req.headers);
        if (verbosity() >= Verbosity.MEDIUM) {
          console.log(
            `Incoming payload size: ${
              ObjectSize(req.body) + ObjectSize(req.headers)
            } bytes`
          );
          console.log(
            `Outgoing payload size: ${
              ObjectSize(relayValue.data) + ObjectSize(relayValue.headers)
            } bytes`
          );
        }

        req.respond({
          body: JSON.stringify(relayValue.data) || undefined,
          headers: constructHeaders(req, config),
        });
      })
      .catch((err) => {
        performance.mark(req.url);
        print(err, Verbosity.HIGH);
      });
  }
}
