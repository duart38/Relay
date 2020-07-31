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