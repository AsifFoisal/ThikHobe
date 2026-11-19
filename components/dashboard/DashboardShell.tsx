"use client"

import { Dialog } from "@base-ui/react/dialog"
import { Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { Logo } from "@/components/layout/Logo"
import { Avatar } from "@/components/ui/Avatar"
import { RoleBadge } from "@/components/ui/RoleBadge"
import { DASHBOARD_WORKSPACE_LABEL } from "@/constants/dashboard-nav"
import { cn } from "@/lib/utils"
import type { SessionUser } from "@/types"

export function DashboardShell({
  user,
  children,
}: {
  user: SessionUser
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-svh bg-paper lg:flex">
      <aside
        className={cn(
          "hidden shrink-0 flex-col border-r border-line bg-card transition-[width] duration-200 lg:sticky lg:top-0 lg:flex lg:h-svh",
          collapsed ? "lg:w-[4.75rem]" : "lg:w-64"
        )}
      >
        <DashboardSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((current) => !current)}
          user={user}
        />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 border-b border-line bg-paper">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
                <Dialog.Trigger
                  aria-label="Open dashboard navigation"
                  className="inline-flex size-10 items-center justify-center rounded-[0.625rem] border border-line bg-card text-ink transition-colors hover:bg-sage/60 focus-visible:ring-2 focus-visible:ring-fern focus-visible:outline-none lg:hidden"
                >
                  <Menu aria-hidden className="size-5" />
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Backdrop className="fixed inset-0 z-[60] bg-ink/50 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
                  <Dialog.Popup className="fixed inset-y-0 left-0 z-[60] flex w-[18rem] max-w-[85vw] flex-col border-r border-line bg-card shadow-lift transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] data-ending-style:-translate-x-full data-starting-style:-translate-x-full">
                    <Dialog.Title className="sr-only">
                      Dashboard navigation
                    </Dialog.Title>
                    <DashboardSidebar
                      mobile
                      onNavigate={() => setMobileOpen(false)}
                      user={user}
                    />
                  </Dialog.Popup>
                </Dialog.Portal>
              </Dialog.Root>
              <Link
                aria-label="ThikHobe home"
                className="rounded-lg lg:hidden"
                href="/"
              >
                <Logo />
              </Link>
              <p className="hidden truncate text-sm font-semibold text-ink lg:block">
                {DASHBOARD_WORKSPACE_LABEL[user.role]}
              </p>
            </div>

            <div className="ml-auto flex min-w-0 items-center gap-3">
              <Avatar name={user.name} size="sm" src={user.image} />
              <div className="hidden min-w-0 sm:block">
                <p className="truncate text-sm font-semibold text-ink">
                  {user.name}
                </p>
                <div className="mt-1">
                  <RoleBadge role={user.role} />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main
          className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8"
          id="main"
        >
          {children}
        </main>
      </div>
    </div>
  )
}
