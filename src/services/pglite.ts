import { Config, Data, Effect, flow, Schema } from 'effect';
import { PGlite } from '@electric-sql/pglite'
import { live } from '@electric-sql/pglite/live'
import { drizzle } from 'drizzle-orm/pglite';

class PgliteError extends Data.TaggedError("PgliteError")<{
  cause: unknown;
}> { }

const execute = <A, I, T, E>(
  schema: Schema.Schema<A, I>,
  exec: (values: I) => Effect.Effect<T, E>
) =>
  flow(
    Schema.decode(schema),
    Effect.flatMap(Schema.encode(schema)),
    Effect.tap((encoded) => Effect.log("Insert", encoded)),
    Effect.mapError((error) => new PgliteError({ cause: error })),
    Effect.flatMap(exec)
  );

export class Pglite extends Effect.Service<Pglite>()("Pglite", {
  effect: Effect.gen(function* () {
    const indexDb = yield* Config.string("INDEX_DB");
    Effect.log(indexDb)

    const client = yield* Effect.tryPromise({
      try: () =>
        PGlite.create(`idb://${indexDb}`, {
          extensions: { live },
        }),
      catch: (error) => new PgliteError({ cause: error }),
    });

    const orm = drizzle({ client });

    const query = <R>(execute: (_: typeof orm) => Promise<R>) =>
      Effect.tryPromise({
        try: () => execute(orm),
        catch: (error) => new PgliteError({ cause: error }),
      });
    Schema.TaggedRequest()



    return {
      client,
      orm,
      query
    }
  })
}
) { }
