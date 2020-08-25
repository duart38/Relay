import { HTTPModelMethod } from '../interfaces/model.ts';
import { ServerRequest } from "https://deno.land/std/http/server.ts";
import { Status } from "https://deno.land/std/http/http_status.ts";import { discardUnknownHeaders } from './filtering.ts';
import { print } from './logging.ts';
import { Verbosity } from '../enums/verbosity.ts';

/**
 * Construct headers based on configuration
 * @param req 
 * @param HTTPModelMethod 
 */
export function constructHeaders(req: any, HTTPModelMethod: HTTPModelMethod): Headers {
  let headers = <Headers>req.headers;
  headers.delete('Content-Length');
  discardUnknownHeaders(HTTPModelMethod, headers);

  Object.entries(HTTPModelMethod.headers).map((val) => {
    if(headers.has(val[0])) {
      print(`The header ${val[0]} was already found on the existing headers. replacing`, Verbosity.MEDIUM);
      headers.delete(val[0])
    }
    headers.append(val[0], val[1]);
  });
  return headers;
}
/**
 * Default headers to handle with requests like OPTIONS
 * @param req 
 */
export function defaultHeaders(req: any) {
  let headers = <Headers>req.headers;
  headers.delete('Content-Length');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Headers', '*');
  headers.append('Allow', 'OPTIONS, GET, HEAD, POST, PUT, DELETE');
  return headers;
}
/**
 * Converts the type Header to an object representation (plays nice with axiod)
 * @param headers 
 */
export function headersToObject(headers: Headers): object{
  let arr: any = {};
  headers.forEach((val, key)=>{
    arr[key] = val;
  });
  return arr;
}

/**
 * Helper method to respond with an error code.
 * @param req 
 * @param status 
 */
export function respondError(req: ServerRequest, status: Status){ 
  req.respond({status})
}