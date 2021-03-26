import { modelsFolder } from '../CLA.ts';
import { getUrlQueryStrings } from './decoding.ts';
import { modelWatcher } from '../server.ts';
import { Connection } from '../enums/connectionTypes.ts';
import { HTTPModelMethod, SOCKETModelMethod } from '../interfaces/model.ts';
import { print } from './logging.ts';
import { Verbosity } from '../enums/verbosity.ts';

/**
 * Loads the configuration method of a particular model.
 * NOTE: This method does not load the whole models file but only a section of it
 * @param model 
 * @param method 
 * @param req 
 * @param connectionType 
 */
export async function loadConfiguration(
  model: string,
  method: string,
  urlParameters: Array<string>,
  req: any,
  connectionType: Connection
): Promise<HTTPModelMethod | SOCKETModelMethod | undefined> {
  try {
    let fileHash = modelWatcher.getObservable().getValue();
    performance.mark('start_' + fileHash);
    const importPath = `../${modelsFolder()}/${sanitizeEvent(model)}.ts?${fileHash}`;
    print(`[>] importPath: ${importPath}`, Verbosity.HIGH);
    let m = await import(importPath);
    performance.mark('end_' + fileHash);
    let time = performance.measure('config_load', `start_${fileHash}`, `end_${fileHash}`).duration;
    print(`[!] configuration loaded in: ${time} ms`, Verbosity.HIGH);
    if (typeof m[Object.keys(m)[0]] == 'function') {
      var temp = await m[Object.keys(m)[0]](req.headers, getUrlQueryStrings(req.url), urlParameters); // headers and url params are available in models
      return temp[connectionType][method];
    } else {
      return m[Object.keys(m)[0]];
    }
  } catch (error) {
    return undefined;
  }
}
function sanitizeEvent(eventString: string): string {
  return eventString.replaceAll(/(\W|\r|\t|\n|\s)+/g, "");
}