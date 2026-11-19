import { DashboardRouteShell } from "@/components/dashboard/dashboard-route-shell"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <DashboardRouteShell>{children}</DashboardRouteShell>
}
