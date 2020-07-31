import { modelsFolder } from "../CLA.ts";
/**
 * Constructs response data based on provided interface.
 * Note that this method does not check if the model is available (see router.ts)
 * @param model interface to use to construct response data
 */
export async function constructResponse(
    model: string,
    headers: any = {},
    url: string = "",
  ): Promise<Object> {
    let m = await import(`../${modelsFolder()}/${model}?${Math.random()}.ts`);
    if (typeof m[Object.keys(m)[0]] == "function") {
      return await m[Object.keys(m)[0]](headers, getUrlParams(url)); //TODO: we could inject the headers and or body of the request to the method
    } else {
      return m[Object.keys(m)[0]];
    }
}

export function constructHeaders(req: any) {
  let headers = req.headers;
  headers.append("Access-Control-Allow-Origin", "*");
  headers.append("Access-Control-Allow-Headers", "*");
  return headers;
}

export function getUrlParams(url: string): object {
  var vars: any = {};
  var hashes = url.split("?")[1];
  if (!hashes) return {};
  var hash = hashes.split("&");

  for (var i = 0; i < hash.length; i++) {
    let params = hash[i].split("=");
    vars[params[0]] = params[1];
  }
  return vars || {};
}
