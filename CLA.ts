import config from "./config.js";
import { parse } from "https://deno.land/std/flags/mod.ts";
import { Verbosity } from "./enums/verbosity.ts";
const args: any = parse(Deno.args);

/**
 * Gets the model folder from the command line or defaults to the one specified in the config.js file
 */
export function modelsFolder(): string {
  if ("m" in args) {
    return args["m"].endsWith("/")
      ? replaceAt(args["m"], args["m"].length - 1, "")
      : args["m"];
  }
  return config.models_folder;
}

/**
 * Gets the verbosity passed in the command line or defaults to the value specified in the config
 */
export function verbosity(): Verbosity {
 if ("v" in args) {
   return Verbosity[args["v"] as keyof typeof Verbosity];
 }
 return config.verbosity;
}

/**
 * Gets the port number passed in the command line or defaults to the value specified in the config
 */
export function portnum(): number {
  if ("p" in args) {
    return Number.parseInt(args["p"])
  }
  return config.port;
}

export function TLS(): {cert: string, key: string}|null{
  if("c" in args && "k" in args){ // assume valid TLS configuration
    return {cert: args["c"], key: args["k"]}
  }
  return null;
}

/**
 * Name says it all..
 * Credits to : https://gist.github.com/efenacigiray/9367920
 * @author https://github.com/efenacigiray
 * @param string 
 * @param index 
 * @param replace 
 */
function replaceAt(string: string, index: number, replace: string): string {
  return string.substring(0, index) + replace + string.substring(index + 1);
}
