import { Model } from "../interfaces/model.ts";
import { HTTP } from "../enums/httpTypes.ts";

const port = 8000;
export const Test = async (): Promise<Model> => {
  return {
    HTTP: {
      // http endpoints available for the sub route 'Test'  e.g: www.medit_mw.com/Test/getAllProducts
      getAllProducts: {
        // this is a sub-route under "/test" call..
        route: `http://localhost:${port}/about`, // this is like a relay  (http://190.4.176.147:${port}/very/long/unkown/call)
        cors: {
          // we want to append these when we relay the signal back to the caller...
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        type: HTTP.GET, // make a GET request to the route
        // TODO: add a way to specify what is able to be forwarded eg: 'test' from body. Everything else should be discarded
        // any other config here.. (future proofing)
      },
      getSingleProduct: {
        route: `http://localhost:${port}/about`,
        cors: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        type: HTTP.GET,
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
