import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/favorites')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Favorites page placeholder</div>
}
