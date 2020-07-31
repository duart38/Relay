/**
 * Calls the database and loads expected behavior for our components
 * E.g: server will instruct websocket what to do when 'test' message is emitted from the client
 */
export function loadConfiguration(){
    const dummy_http = {
        getAllProducts: {
            route: "/call/to/ISS/server", // this is like a relay
            cors: { // we want to append these when we relay the signal back to the caller...
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            }
            // TODO: add a way to specify what is able to be forwarded eg: 'test' from body. Everything else should be discarded
            // any other config here.. (future proofing)
        }
    }
    const dummy_wss = {
        add_to_sc: {
            route: "/call/to/ISS/server",
            // any other config here.. (future proofing)
        }
    }
    return {};
}