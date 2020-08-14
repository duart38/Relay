import { HTTPModelMethod } from "../interfaces/model.ts";

export function checkRequiredHeaders(config: HTTPModelMethod, headers: Headers): boolean{
    if(config.requiredHeaders){
        let t = config.requiredHeaders?.map((val)=>headers.has(val));
        return !t.includes(false)
    }
    return true;
}