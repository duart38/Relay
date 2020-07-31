import { WebSocket, WebSocketServer } from "https://deno.land/x/websocket/mod.ts";



/**
 * Passes on connections to a server but also takes in connection from a server to notify clients.
 */
export default class SocketBridge{
    wss: WebSocketServer;
    constructor(port: number){
        this.wss = new WebSocketServer(8080);
        this.Configure();
    }

    private Configure(){
        // TODO: call db, get instructions, register events here.
        // ws.on("message", function (message: string) {
        //     ws.send("sss")
        // });
    }

}