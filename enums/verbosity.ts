/**
 * Dictates how much is printed to the console. Higher = more.
 * WARNING: higher verbosity levels WILL impact performance.
 */
export enum Verbosity {
  SILENT, // nothing is printed
  LOW, // prints when a request is received and it's method
  MEDIUM, // prints when a request is received, about to be sent, and some performance measuring (errors included)
  HIGH, // prints everything... i feel bad for your terminal emulator ....
}
