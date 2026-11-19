"use client"

import { usePathname } from "next/navigation"
import { createContext, useContext } from "react"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import {
  DEMO_ADMIN,
  DEMO_TECHNICIAN,
  DEMO_USER,
} from "@/constants/demo"
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
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const user =
    pathname.startsWith("/dashboard/technician") ||
    pathname.startsWith("/dashboard/profile/technician")
      ? DEMO_TECHNICIAN
      : pathname.startsWith("/dashboard/admin") ||
          pathname.startsWith("/dashboard/profile/admin")
        ? DEMO_ADMIN
        : DEMO_USER

  return (
    <DashboardUserContext.Provider value={user}>
      <DashboardShell user={user}>{children}</DashboardShell>
    </DashboardUserContext.Provider>
  )
}
