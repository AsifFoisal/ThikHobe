import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DEMO_USER } from "@/constants/demo"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <DashboardShell user={DEMO_USER}>{children}</DashboardShell>
}
