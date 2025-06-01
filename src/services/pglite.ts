import { Config, Data, Effect } from 'effect';
import { PGlite } from '@electric-sql/pglite'
import { live } from '@electric-sql/pglite/live'
import { drizzle } from 'drizzle-orm/pglite';

class PgliteError extends Data.TaggedError("PgliteErro")<{
  cause: unknown
}> { }


export class Pglite extends Effect.Service<Pglite>()(
  "Pglite",
  {
    effect: Effect.gen(function* () {
      const indexDb = yield* Config.string('INDEX_DB')

      const client = yield* Effect.tryPromise({
        try: () => PGlite.create(`idb://${indexDb}`, {
          extensions: { live }
        }),
        catch: (cause) => new PgliteError({ cause })
      })

      const orm = drizzle({ client })



      return {
        client,
        orm
      }
    })
  }
) { }
