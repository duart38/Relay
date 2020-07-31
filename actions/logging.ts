import { verbosity } from "../CLA.ts";
import { Verbosity } from "../enums/verbosity.ts";
const selectedVerbosity = verbosity();
print(`[+] Verbosity level: ${selectedVerbosity}`, Verbosity.LOW)

/**
 * Prints messages based on the user defined verbosity level
 * @param msg The message to be printed
 * @param level The verbosity level this msg is allowed at
 */
export async function print(msg: any, level: Verbosity){
    if(selectedVerbosity >= level){
        console.log(msg);
    }
}