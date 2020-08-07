import { HTTP } from "../enums/httpTypes.ts";

/**
 * The entire model structure
 */
export interface Model {
  HTTP: HTTPModelObject;
  SOCKET?: SOCKETModelMethod;
}

/**
 * Represents a single HTTP method in our model. This contains the instructions to be used by this application
 */
export interface HTTPModelMethod {
  route: string;
  cors: {
    // we want to append these when we relay the signal back to the caller...
    "Access-Control-Allow-Origin": string;
    "Access-Control-Allow-Headers": string;
  };
  type: HTTP;
  decode?: boolean;
}

/**
 * Represents a single Web Socket method in our model
 */
export interface SOCKETModelMethod {
  sync_cart: {
    route: string; // this is like a relay
  };
}

/**
 * an object of HTTPModels
 */
interface HTTPModelObject {
  [key: string]: HTTPModelMethod;
}