import { HTTPModelMethod } from "../interfaces/model.ts";

export function constructHeaders(req: any, HTTPModelMethod: HTTPModelMethod) {
  let headers = req.headers;

    Object.entries(HTTPModelMethod.cors).map((val)=>{
      headers.append(val[0], val[1])
    })
  return headers;
}
