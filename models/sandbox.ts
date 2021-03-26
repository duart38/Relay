import { Model } from '../interfaces/model.ts';
import { HTTP } from '../enums/httpTypes.ts';

export const sandbox = async (): Promise<Model> => {
  return {
    HTTP: {
      about: {
        route: `https://localhost:6969/about`,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
        type: HTTP.GET,
        decode: false
      },
      old: {
        route: `http://localhost:8000/about`,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*'
        },
        type: HTTP.POST,
        decode: true,
        decodeResponse: false
      },
    },
    SOCKET: {
      // socket messages available for the sub route 'Test'  e.g: socket.send('sync_cart')
      sync_cart: {
        route: `http://190.4.176.147:7777/very/long/unkown/call`, // this is like a relay
      },
    },
  };
};
