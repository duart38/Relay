import { HTTPModelMethod } from '../interfaces/model.ts';

/**
 * Get the query parameters attached to a url in a json object
 * @param url 
 */
export function getUrlParams(url: string): object {
  var vars: any = {};
  var hashes = url.split('?')[1];
  if (!hashes) return {};
  var hash = hashes.split('&');

  for (var i = 0; i < hash.length; i++) {
    let params = hash[i].split('=');
    vars[params[0]] = params[1];
  }
  return vars || {};
}

/**
 * Helper method that reads the config and determines wether it should convert the body or pass it on as is (unit8array)
 * @param config 
 * @param body 
 */
export async function decodeBody(
  config: HTTPModelMethod,
  body: Deno.Reader
): Promise<Uint8Array | string> {
  let decoded: Uint8Array | string = config.decode
    ? new TextDecoder().decode(await Deno.readAll(body))
    : await Deno.readAll(body);
  return decoded;
}
