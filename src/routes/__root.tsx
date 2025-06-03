import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { PGliteProvider } from "@electric-sql/pglite-react";
import Header from '../components/Header'
import { PgliteDrizzleContext } from '@/hooks/use-pglite-drizzle';
import type { PGlite } from '@electric-sql/pglite';
import type { LiveNamespace, PGliteWithLive } from '@electric-sql/pglite/live';
import type { PgliteDatabase } from 'drizzle-orm/pglite';
import { env } from '@/env';


interface RouterContext {
  client: PGliteWithLive | undefined;
  orm: PgliteDatabase<Record<string, never>> & {
    $client: PGlite & {
      live: LiveNamespace;
    };
  } | null
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  loader: ({ context }) => context,
  errorComponent: (error) => <pre>{JSON.stringify(error, null, 2)}</pre>,
})

function RootComponent() {
  const { client, orm } = Route.useLoaderData();

  return (
    <PGliteProvider db={client}>
      <PgliteDrizzleContext.Provider value={orm}>
        <div className="min-h-screen flex flex-col bg-theme-background">
          <Header />

          <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            <Outlet />
          </main>

          {env.VITE_NODE_ENV === 'development' && <TanStackRouterDevtools />}
        </div>
      </PgliteDrizzleContext.Provider>
    </PGliteProvider>
  );
}
