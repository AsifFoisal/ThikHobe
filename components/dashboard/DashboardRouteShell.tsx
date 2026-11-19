"use client"

import { DashboardShell } from "@/components/dashboard/DashboardShell"
import type { SessionUser } from "@/types"

export function DashboardRouteShell({
  user,
  children,
}: {
  user: SessionUser
  children: React.ReactNode
}) {
  return <DashboardShell user={user}>{children}</DashboardShell>
}
