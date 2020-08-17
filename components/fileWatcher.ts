import Observe from "https://raw.githubusercontent.com/duart38/Observe/master/Observe.ts";
import { print } from "../actions/logging.ts";
import { Verbosity } from "../enums/verbosity.ts";

export class Watcher {
  hash: Observe<string>;

  constructor(dir: string) {
    print(`[+] starting file watcher in directory ${dir}`, Verbosity.LOW);
    this.hash = new Observe(this.newHash());
    this.init(dir);
  }

  /**
   * Gets a new random hash
   */
  private newHash(): string {
    return crypto.getRandomValues(new Uint32Array(2)).toString().replace(
      ",",
      "",
    );
  }

  /**
   * top-level await seems to misbehave in constructor..
   * @param x path to watch
   */
  private async init(x: string) {
    const watcher = Deno.watchFs(x);
    for await (const event of watcher) {
      this.hash.setValue(this.newHash());
      print(`[+] models updated. The next request will receive the changes (${event.kind})`, Verbosity.MEDIUM);
    }
  }

  /**
   * Get the observable value attached to this instance.
   * @see https://github.com/duart38/Observe
   */
  public getObservable(): Observe<string> {
    return this.hash;
  }
}
