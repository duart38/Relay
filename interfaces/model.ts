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
  headers: HeaderEntries
  type: HTTP;
  /**
   * Indicates wether we want to decode the body (from int8arr) before we forward to the relay server
   */
  decode?: boolean;
  /**
   * Indicates wether we want to decode the body to JSON before we send it back to the CLIENT
   */
  decodeResponse?: boolean
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


interface HeaderEntries {
  [key: string]: string;
}