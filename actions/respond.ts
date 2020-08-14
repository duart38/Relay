import { HTTPModelMethod } from '../interfaces/model.ts';
import { ServerRequest } from "https://deno.land/std/http/server.ts";
export function constructHeaders(req: any, HTTPModelMethod: HTTPModelMethod): Headers {
  let headers = <Headers>req.headers;
  headers.delete('Content-Length');
  headers.delete("content-type")

  Object.entries(HTTPModelMethod.cors).map((val) => {
    headers.append(val[0], val[1]);
  });
  return headers;
}

export function defaultHeaders(req: any) {
  let headers = <Headers>req.headers;
  headers.delete('Content-Length');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Headers', '*');
  headers.append('Allow', 'OPTIONS, GET, HEAD, POST, PUT, DELETE');
  return headers;
}
export function headersToObject(headers: Headers): object{
  let arr: any = {};
  headers.forEach((val, key)=>{
    arr[key] = val;
  });
  return arr;
}

export function respondError(req: ServerRequest){ 
  req.respond({body: JSON.stringify({ ERROR: "error" })})
}