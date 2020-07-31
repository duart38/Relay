import { Verbosity } from "./enums/verbosity.ts";

export default {
  port: 3000, // the port of the middleware (this).
  relayURL: "http://190.4.176.147:52199/API.svc/", // serves as the base url
  models_folder: "./models",
  verbosity: Verbosity.SILENT
};
