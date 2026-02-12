import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sutra')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Sūtra page placeholder</div>
}
