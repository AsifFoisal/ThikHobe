import { DashboardRouteShell } from "@/components/dashboard/dashboard-route-shell"
import { requireSessionUser } from "@/lib/server-api"

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await requireSessionUser()

  return <DashboardRouteShell user={user}>{children}</DashboardRouteShell>
}
