import { HTTPModelMethod } from "../interfaces/model.ts";
import { Verbosity } from "../enums/verbosity.ts";
import { print } from "./logging.ts";

/**
 * Check wether the required headers specified by the models are present.
 * Returns true if pass and false if fail.
 * @param config 
 * @param headers 
 */
export function checkRequiredHeaders(config: HTTPModelMethod, headers: Headers): boolean{
    if(config.requiredHeaders){
        let t = config.requiredHeaders?.map((val)=>headers.has(val));
        print(t.includes(false) ? "[-] One or more required headers not passed. Sending error" : "[+] Header check passed", Verbosity.MEDIUM)
        return !t.includes(false)
    }
    return true;
}

/**
 * Removed unkown headers from the header pool
 * @param config 
 * @param headers 
 */
export function discardUnknownHeaders(config: HTTPModelMethod, headers: Headers): Headers{
    if(config.requiredHeaders && config.discardUnknownHeaders){
        headers.forEach((val, key)=>{
            try{
                if(!config.requiredHeaders?.includes(key)){
                    console.log(key)
                    headers.delete(key);
                }
            }catch(e){}
        });
        return headers;
    }
    return headers;
}