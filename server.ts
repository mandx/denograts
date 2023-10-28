import { GraphQLHTTP } from 'gql';
import { extractGratsSchemaAtRuntime } from 'grats';

import Query from "./schema.ts";

// TODO: Switch to buildSchemaFromSDL before using in production
const schema = extractGratsSchemaAtRuntime({
  emitSchemaFile: "./schema.graphql",
});

Deno.serve(async (req) => {
  const { pathname } = new URL(req.url)
  return pathname === '/graphql'
    ? await GraphQLHTTP<Request>({
      schema,
      rootValue: new Query,
      graphiql: true,
    })(req)
    : new Response('Not Found', { status: 404 })
});
