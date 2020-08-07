import { HTTPModelMethod } from '../interfaces/model.ts';

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

export async function decodeBody(
  config: HTTPModelMethod,
  body: Deno.Reader
): Promise<Uint8Array | string> {
  let decoded: Uint8Array | string = config.decode
    ? new TextDecoder().decode(await Deno.readAll(body))
    : await Deno.readAll(body);
  return decoded;
}
