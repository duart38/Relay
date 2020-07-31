import { HTTP } from "../enums/httpTypes.ts";

/**
 * The entire model structure
 */
export interface Model {
  HTTP: {
    // http endpoints available for the sub route 'Test'  e.g: www.medit_mw.com/Test/getAllProducts
    getAllProducts: HTTPModelMethod;
  };
  SOCKET?: SOCKETModelMethod;
}

/**
 * Represents a single HTTP method in our model
 */
export interface HTTPModelMethod {
  route: string;
  cors: {
    // we want to append these when we relay the signal back to the caller...
    "Access-Control-Allow-Origin": string;
    "Access-Control-Allow-Headers": string;
  };
  type: HTTP;
}

/**
 * Represents a single Web Socket method in our model
 */
export interface SOCKETModelMethod {
  sync_cart: {
    route: string; // this is like a relay
  };
}
