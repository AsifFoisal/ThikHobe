"use client"

import { Dialog } from "@base-ui/react/dialog"
import { House, PanelLeftClose, PanelLeftOpen, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Logo } from "@/components/layout/logo"
import { Avatar } from "@/components/ui/avatar"
import { RoleBadge } from "@/components/ui/role-badge"
import { DASHBOARD_NAV } from "@/constants/dashboard-nav"
import { cn } from "@/lib/utils"
import type { SessionUser } from "@/types"

interface DashboardSidebarProps {
  user: SessionUser
  collapsed?: boolean
  mobile?: boolean
  onToggle?: () => void
  onNavigate?: () => void
}

const navButtonClass =
  "flex h-10 items-center gap-3 rounded-lg text-sm font-medium transition-colors"

export function DashboardSidebar({
  user,
  collapsed = false,
  mobile = false,
  onToggle,
  onNavigate,
}: DashboardSidebarProps) {
  const pathname = usePathname()
  const items = DASHBOARD_NAV[user.role]
  const activeHref =
    pathname === "/dashboard"
      ? items[0]?.href
      : items
          .filter(
            (item) =>
              pathname === item.href || pathname.startsWith(`${item.href}/`)
          )
          .sort((a, b) => b.href.length - a.href.length)[0]?.href

  return (
    <>
      <div
        className={cn(
          "flex h-16 shrink-0 items-center border-b border-line lg:h-[4.5rem]",
          mobile
            ? "justify-between px-4"
            : collapsed
              ? "justify-center px-2"
              : "justify-between px-4"
        )}
      >
        {mobile ? (
          <>
            <Link aria-label="FixMate home" className="rounded-lg" href="/">
              <Logo />
            </Link>
            <Dialog.Close
              aria-label="Close dashboard navigation"
              className="grid size-8 place-items-center rounded-[0.5rem] border border-line bg-card text-muted-ink transition-colors hover:bg-sage/60 hover:text-spruce focus-visible:ring-2 focus-visible:ring-fern focus-visible:outline-none"
            >
              <X aria-hidden className="size-4" />
            </Dialog.Close>
          </>
        ) : collapsed ? (
          <button
            aria-label="Expand sidebar"
            className="grid size-8 place-items-center rounded-[0.5rem] border border-line bg-card text-muted-ink transition-colors hover:bg-sage/60 hover:text-spruce focus-visible:ring-2 focus-visible:ring-fern focus-visible:outline-none"
            onClick={onToggle}
            type="button"
          >
            <PanelLeftOpen aria-hidden className="size-4" />
          </button>
        ) : (
          <>
            <Link aria-label="FixMate home" className="rounded-lg" href="/">
              <Logo />
            </Link>
            <button
              aria-label="Collapse sidebar"
              className="grid size-8 place-items-center rounded-[0.5rem] border border-line bg-card text-muted-ink transition-colors hover:bg-sage/60 hover:text-spruce focus-visible:ring-2 focus-visible:ring-fern focus-visible:outline-none"
              onClick={onToggle}
              type="button"
            >
              <PanelLeftClose aria-hidden className="size-4" />
            </button>
          </>
        )}
      </div>

      <nav
        aria-label="Dashboard navigation"
        className="flex-1 overflow-y-auto px-2 py-4"
      >
        {!collapsed ? (
          <p className="px-3 pb-2 text-[0.6875rem] font-semibold tracking-[0.14em] text-muted-ink uppercase">
            Workspace
          </p>
        ) : null}
        <ul className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon
            const active = activeHref === item.href
            return (
              <li key={item.href}>
                <Link
                  aria-current={active ? "page" : undefined}
                  aria-label={collapsed ? item.label : undefined}
                  className={cn(
                    navButtonClass,
                    collapsed ? "justify-center px-0" : "px-3",
                    active
                      ? "bg-sage text-spruce"
                      : "text-muted-ink hover:bg-sage/50 hover:text-spruce"
                  )}
                  href={item.href}
                  onClick={onNavigate}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon
                    aria-hidden
                    className="size-[18px] shrink-0"
                    strokeWidth={1.9}
                  />
                  {!collapsed ? (
                    <span className="truncate">{item.label}</span>
                  ) : null}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="mt-auto">
        {mobile ? (
          <div className="border-t border-line p-3">
            <div className="flex items-center gap-3 rounded-lg bg-sage/40 p-3">
              <Avatar name={user.name} size="sm" src={user.image} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">
                  {user.name}
                </p>
                <p className="truncate text-xs text-muted-ink">{user.email}</p>
              </div>
              <RoleBadge role={user.role} />
            </div>
          </div>
        ) : null}
        <div className="border-t border-line p-2">
          <Link
            aria-label={collapsed ? "Back to home" : undefined}
            className={cn(
              navButtonClass,
              collapsed ? "justify-center px-0" : "px-3",
              "text-muted-ink hover:bg-sage/50 hover:text-spruce"
            )}
            href="/"
            onClick={onNavigate}
            title={collapsed ? "Back to home" : undefined}
          >
            <House aria-hidden className="size-[18px] shrink-0" />
            {!collapsed ? <span>Back to home</span> : null}
          </Link>
        </div>
      </div>
    </>
  )
}
