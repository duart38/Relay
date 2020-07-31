import { modelsFolder } from "./CLA.ts";
import httpServer from "./components/httpServer.ts";
import SocketBridge from "./components/websocket.ts";
import { Watcher } from "./components/fileWatcher.ts";

export const modelWatcher = new Watcher(modelsFolder()); // watching the base models folder

new httpServer();
new SocketBridge(6969);
