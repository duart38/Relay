import { HTTP } from '../enums/httpTypes.ts';

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
    'Access-Control-Allow-Origin': string;
    'Access-Control-Allow-Headers': string;
  };
  type: HTTP;
  decode: boolean;
  /**
   * Used to specifiy what headers are required to continue with the request.. the middleware will discard the request in case a header is missing.
   * An error is returned when there is a missing header
   */
  requiredHeaders?: Array<string>;
  /**
   * Can only be used in combination with requiredHeaders. 
   * If requiredHeaders is not available this setting will do nothing
   */
  discardUnknownHeaders?: boolean
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
