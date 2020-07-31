import { successLog } from "https://deno.land/x/colorlog/mod.ts";
export default class Watcher {
  changed: boolean = false;

  constructor(dir: string) {
    successLog(`[+] starting file watcher in directory ${dir}`);
    this.init(dir);
  }

  /**
   * top-level await seems to misbehave in constructor..
   * @param x path to watch
   */
  private async init(x: string) {
    const watcher = Deno.watchFs(x);
    for await (const event of watcher) {
      this.changed = true;
      successLog(
        `[+] models updated. The next request will receive the changes (${event.kind})`,
      );
    }
  }
  /**
   * Check if the watcher witnessed any changes
   */
  public updated(): boolean {
    return this.changed;
  }
  /**
   * Acknowledge the change, causing the changed value to be false to accept other changes
   * note: don't ack if you want to trigger an update each request (updated() always returns true)
   */
  public ack() {
    this.changed = false;
  }
}
