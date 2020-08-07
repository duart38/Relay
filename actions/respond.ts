import { HTTPModelMethod } from "../interfaces/model.ts";

export function constructHeaders(req: any, HTTPModelMethod: HTTPModelMethod): Headers {
  let headers = <Headers>req.headers;
  headers.delete("Content-Length")

    Object.entries(HTTPModelMethod.cors).map((val)=>{
      headers.append(val[0], val[1])
    })
  return headers;
}
