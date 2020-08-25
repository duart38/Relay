<img src="https://raw.githubusercontent.com/duart38/Relay/master/relaylogo.svg" width="250px">

# Relay
**Relay** is a middleware server built on top of Deno. The idea of **Relay** is to act like a relay server where any request sent to it will be forwarded to a different server that houses the concrete implementation.

This means that **Relay** can be used to encapsulate a network, thus meaning you do not need multiple machines to host multiple servers and or web applications.

Relay can:
1. Encapsulate a network and only forward 1 server that talks to servers internally.
2. Filter out incoming requests and decide what will be forwarded or not.
3. Eliminate the need to buy multiple certificates.
4. Serve websites and or web-apps.
5. Organise HTTP requests in so called models.
6. Decode incoming / outgoing requests.
7. **_Reload the models without needing to restart the server_**
8. Hide long URL names & params under a simple 2 sub route url.
9. Manipulate incoming requests before forwarding (eg. append headers)

Please view the [DOCS](https://github.com/duart38/Relay/wiki) for more information


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
