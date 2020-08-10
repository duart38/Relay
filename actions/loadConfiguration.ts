import { modelsFolder } from '../CLA.ts';
import { getUrlParams } from './decoding.ts';
import { modelWatcher } from '../server.ts';
import { Connection } from '../enums/connectionTypes.ts';
import { HTTPModelMethod, SOCKETModelMethod } from '../interfaces/model.ts';
import { print } from './logging.ts';
import { Verbosity } from '../enums/verbosity.ts';

export async function loadConfiguration(
  model: string,
  method: string,
  req: any,
  connectionType: Connection
): Promise<HTTPModelMethod | SOCKETModelMethod | undefined> {
  try {
    let fileHash = modelWatcher.getObservable().getValue();
    performance.mark('start_' + fileHash);
    let m = await import(`../${modelsFolder()}/${model}?${fileHash}.ts`);
    performance.mark('end_' + fileHash);
    let time = performance.measure('config_load', `start_${fileHash}`, `end_${fileHash}`).duration;
    print(`[!] configuration loaded in: ${time} ms`, Verbosity.HIGH);
    if (typeof m[Object.keys(m)[0]] == 'function') {
      var temp = await m[Object.keys(m)[0]](req.headers, getUrlParams(req.url)); // headers and url params are available in models
      return temp[connectionType][method];
    } else {
      return m[Object.keys(m)[0]];
    }
  } catch (error) {
    return undefined;
  }
}
