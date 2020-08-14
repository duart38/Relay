import { HTTPModelMethod } from "../interfaces/model.ts";
import { Verbosity } from "../enums/verbosity.ts";
import { print } from "./logging.ts";

export function checkRequiredHeaders(config: HTTPModelMethod, headers: Headers): boolean{
    if(config.requiredHeaders){
        let t = config.requiredHeaders?.map((val)=>headers.has(val));
        print(t.includes(false) ? "[-] One or more required headers not passed. Sending error" : "[+] Header check passed", Verbosity.MEDIUM)
        return !t.includes(false)
    }
    return true;
}