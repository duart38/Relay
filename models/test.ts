const port = 52199;
export const Test = {
    HTTP:{ // http endpoints available for the sub route 'Test'  e.g: www.medit_mw.com/Test/getAllProducts
        getAllProducts: {
            route: `http://190.4.176.147:${port}/very/long/unkown/call`, // this is like a relay
            cors: { // we want to append these when we relay the signal back to the caller...
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*",
            },
            // TODO: add a way to specify what is able to be forwarded eg: 'test' from body. Everything else should be discarded
            // any other config here.. (future proofing)
          }
    },
    SOCKET: { // socket messages available for the sub route 'Test'  e.g: socket.send('sync_cart')
        sync_cart: {
            route: `http://190.4.176.147:7777/very/long/unkown/call`, // this is like a relay
            cors: { // we want to append these when we relay the signal back to the caller...
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*",
            },
    
            // TODO: add a way to specify what is able to be forwarded eg: 'test' from body. Everything else should be discarded
            // any other config here.. (future proofing)
          }
    }
    
}