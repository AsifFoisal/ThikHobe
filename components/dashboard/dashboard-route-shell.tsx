"use client"

import { createContext, useContext } from "react"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import type { SessionUser } from "@/types"

const DashboardUserContext = createContext<SessionUser | null>(null)

export function useDashboardUser() {
  const user = useContext(DashboardUserContext)

  if (!user) {
    throw new Error("useDashboardUser must be used inside DashboardRouteShell")
  }

  return user
}

export function DashboardRouteShell({
  user,
  children,
}: {
  user: SessionUser
  children: React.ReactNode
}) {
  return (
    <DashboardUserContext.Provider value={user}>
      <DashboardShell user={user}>{children}</DashboardShell>
    </DashboardUserContext.Provider>
  )
}
