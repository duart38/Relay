import { HTTPModelMethod } from '../interfaces/model.ts';
import { ServerRequest } from "https://deno.land/std/http/server.ts";
import { Status } from "https://deno.land/std/http/http_status.ts";import { discardUnknownHeaders } from './filtering.ts';
export function constructHeaders(req: any, HTTPModelMethod: HTTPModelMethod): Headers {
  let headers = <Headers>req.headers;
  headers.delete('Content-Length');
  headers.delete("content-type");
  discardUnknownHeaders(HTTPModelMethod, headers);

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

export function respondError(req: ServerRequest, status: Status){ 
  req.respond({status})
}