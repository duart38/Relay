import { serve, Server } from "https://deno.land/std/http/server.ts";
import { constructHeaders } from "../actions/respond.ts";
import config from "../config.js";
import { loadConfiguration } from "../actions/loadConfiguration.ts";
import { Connection } from "../enums/connectionTypes.ts";
import { HTTPModelMethod, SOCKETModelMethod } from "../interfaces/model.ts";

import axiod from "https://deno.land/x/axiod/mod.ts";
import { HTTP } from "../enums/httpTypes.ts";

export default class httpServer {
  constructor() {
    const port: number = config.port;
    const server = serve({ port });
    console.log(`[+] Server running on port: ${port}`);
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
    console.log(configuration);
    switch (configuration.type) {
      case HTTP.GET:  return await axiod.get(configuration.route, { headers });
      case HTTP.POST: return await axiod.post(configuration.route, body, { headers });
      default: return await axiod.get(configuration.route);
    }
  }

  private async init(server: Server) {
    for await (const req of server) {
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
        console.log("Relay responded with the below data")
        console.log(relayValue)
        req.respond({ body: JSON.stringify(relayValue.data) || "", headers: constructHeaders(req, config) });
      }).catch((err)=>{
        console.error(err)
      })
     
    }
  }
}
