# denograts

Extremely simple demo project exploring integration between [Grats](https://github.com/captbaritone/grats) and [Deno](https://deno.land/)

## Prerequisites
[Install Deno](https://docs.deno.com/runtime/manual#install-deno)

## Running the server:
```
$ deno run -A server.ts
```

## Generating the schema
```
$ deno run npm:grats/dist/src/cli.js --output=./schema.graphql
```

Not as pretty as just typing `npx grats`, but one can always stuff that command as a [Deno task](https://docs.deno.com/runtime/manual/tools/task_runner):

```
$ deno task grats-gen
```

## Issues specific to Deno (so far)

* Scalars provided by Grats (`import { Float, Int, ID } from "grats"`) are importable just fine, but seems like the docblocks aren't reachable.
  * Kinda makes sense: these imports are importmaps managed by Deno; I'm guessing Grat's Typescript compiler can't locate the actual file where the scalars are defined, the file containing the scalars' dockblocks.
  * A not-so-terrible workaround is to "vendor" the scalar definitions, so they are fully accessible by Grat's (see `schema.ts` in this repo).
* Module remapping must be done carefully to ensure a single `graphql` version is pulled, otherwise `graphql` itself will complain.
