import { serve, Server } from "https://deno.land/std/http/server.ts";
import { constructHeaders } from "../actions/respond.ts";
import config from "../config.js";
import { loadConfiguration } from "../actions/loadConfiguration.ts";
import { Connection } from "../enums/connectionTypes.ts";
import { HTTPModelMethod } from "../interfaces/model.ts";

import axiod from "https://deno.land/x/axiod/mod.ts";
import { HTTP } from "../enums/httpTypes.ts";
import { print } from "../actions/logging.ts";
import { Verbosity } from "../enums/verbosity.ts";

export default class httpServer {
  constructor() {
    const port: number = config.port;
    const server = serve({ port });
    print(`[+] Server running on port: ${port}`, Verbosity.LOW);
    this.init(server);
  }

  /**
   * Forwards HTTP requests based on config..
   */
  async forward(
    configuration: HTTPModelMethod,
    headers?: any,
    body?: any,
  ): Promise<any> {
    print(`[->] Forwarding to (${configuration.route})`, Verbosity.MEDIUM);
    print(`| With configuration:`, Verbosity.HIGH);
    print(configuration, Verbosity.HIGH);
    switch (configuration.type) {
      case HTTP.GET:  return await axiod.get(configuration.route, { headers });
      case HTTP.POST: return await axiod.post(configuration.route, body, { headers });
      default: return await axiod.get(configuration.route);
    }
  }

  private async init(server: Server) {
    for await (const req of server) {
      performance.mark(`start_http_${req.url}`);
      print(`[+] ${req.method} - ${req.url}`, Verbosity.LOW);
      const urlMethod = req.url
        .split("/")[req.url.split("/").length - 1].split("?")[0]; // last piece of url (test/some/stuff) -> (stuff)
      const urlModel = req.url.split("/")[req.url.split("/").length - 2] +
        ".ts";
      const config = <HTTPModelMethod> await loadConfiguration(
        urlModel,
        urlMethod,
        req,
        Connection.HTTP,
      );
      this.forward(config).then((relayValue)=>{
        print(`[+] Relay server responded with the below.. forwarding`, Verbosity.HIGH);
        print(relayValue, Verbosity.HIGH);
        performance.mark(`end_http_${req.url}`);
        print(`| Duration: ${performance.measure(req.url, `start_http_${req.url}`, `end_http_${req.url}`).duration} ms`, Verbosity.MEDIUM)
        req.respond({ body: JSON.stringify(relayValue.data) || "", headers: constructHeaders(req, config) });
      }).catch((err)=>{
        performance.mark(req.url);
        print(err, Verbosity.HIGH)
      })
     
    }
  }
}
