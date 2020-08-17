import { Model } from '../interfaces/model.ts';
import { HTTP } from '../enums/httpTypes.ts';

export const statics = async (headers: Headers, urlQuerry: object, urlParameters: Array<string>): Promise<Model> => {
    console.log(urlParameters)
  return {
    HTTP: {
      js: {
        route: `http://localhost:3001/static/js/${urlParameters[0]}`,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
        type: HTTP.GET,
        decode: false
      }
    },
    SOCKET: {
      // socket messages available for the sub route 'Test'  e.g: socket.send('sync_cart')
      sync_cart: {
        route: `http://190.4.176.147:7777/very/long/unkown/call`, // this is like a relay
      },
    },
  };
};
