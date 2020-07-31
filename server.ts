import { serve, Server } from "https://deno.land/std/http/server.ts";
import { constructHeaders } from "./actions/respond.ts";
import config from "./config.js";

const port: number = config.port;
const server = serve({ port });
console.log(`[+] Server running on port: ${port}`);

for await (const req of server) {
  req.respond({ body: "hello world", headers: constructHeaders(req) });
}
