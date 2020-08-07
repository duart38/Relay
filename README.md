# MedIT_middleware
Provide a compatibility layer for IIS server. Also serves as a middleware.

# CLI
- -m ./path/to/models/folder

- -v VERBOSITY(see below)
```TypeScript
export enum Verbosity {
  SILENT, // nothing is printed
  LOW, // prints when a request is received and it's method
  MEDIUM, // prints when a request is received, about to be sent, and some performance measuring (errors included)
  HIGH, // prints everything... i feel bad for your terminal emulator ....
}
```
