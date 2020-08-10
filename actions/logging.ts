import { verbosity } from "../CLA.ts";
import { Verbosity } from "../enums/verbosity.ts";
const selectedVerbosity = verbosity();
print(`[+] Verbosity level: ${selectedVerbosity}`, Verbosity.LOW)

/**
 * Prints messages based on the user defined verbosity level
 * @param msg The message to be printed
 * @param level The verbosity level this msg is allowed at
 */
export function print(msg: any, level: Verbosity){
    if(selectedVerbosity >= level){
        console.log(msg);
    }
}

/**
 * Returns Object sized in bytes.
 * @param object to be measured
 */
export function ObjectSize( object: any ) {

    var objectList: any = [];

    var recurse = function( value: any)
    {
        var bytes = 0;

        if ( typeof value === 'boolean' ) {
            bytes = 4;
        }
        else if ( typeof value === 'string' ) {
            bytes = value.length * 2;
        }
        else if ( typeof value === 'number' ) {
            bytes = 8;
        }
        else if
        (
            typeof value === 'object'
            && objectList.indexOf( value ) === -1
        )
        {
            objectList[ objectList.length ] = value;

            for( let i in value ) {
                bytes+= 8; // an assumed existence overhead
                bytes+= recurse( value[i] )
            }
        }

        return bytes;
    }

    return recurse( object );
}