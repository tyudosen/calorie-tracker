import { createFileRoute } from '@tanstack/react-router'
import { Repl } from '@electric-sql/pglite-repl'

export const Route = createFileRoute('/sql')({
  component: RouteComponent,
  loader: ({ context }) => context
})

function RouteComponent() {
  const { client } = Route.useLoaderData()
  return <Repl pg={client} />
} 
