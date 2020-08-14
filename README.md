# MedIT_middleware
Provide a compatibility layer for IIS server. Also serves as a middleware.

# Running from the CLI
Install deno, clone, and run with:
```bash
deno run --allow-read --allow-net server.ts
```
## Changing the configuration from the command line

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

- -p port_number

- -c cert file -k key file 
> The above need to be used together for serving over TLS

## Changing the default configuration
Open up config.json.. write some stuff.. done