"use client"

import { Menu } from "@base-ui/react/menu"
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu as MenuIcon,
  UserRound,
  X,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, type KeyboardEvent } from "react"

import { Logo } from "@/components/layout/logo"
import { Avatar } from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"
import { RoleBadge } from "@/components/ui/role-badge"
import { Skeleton } from "@/components/ui/skeleton"
import { PUBLIC_NAV, ROLE_DASHBOARD } from "@/constants"
import { previewToast } from "@/lib/preview-toast"
import { cn } from "@/lib/utils"
import type { SessionUser } from "@/types"

type NavItem = (typeof PUBLIC_NAV)[number]

const desktopLinkClass =
  "inline-flex h-9 items-center rounded-full px-3.5 text-sm font-medium transition-colors"
const mobileLinkClass =
  "flex items-center rounded-lg px-3 py-2.5 text-[0.9375rem] font-medium transition-colors"
const mobileActionClass =
  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-sage/60 hover:text-spruce"
const menuItemClass =
  "flex cursor-default items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-ink outline-none select-none data-highlighted:bg-sage data-highlighted:text-spruce"
const menuSeparatorClass = "my-1 h-px bg-line"

function isNavActive(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`)
}

function NavLink({
  item,
  active,
  mobile = false,
  onClick,
}: {
  item: NavItem
  active: boolean
  mobile?: boolean
  onClick?: () => void
}) {
  return (
    <Link
      aria-current={active ? "page" : undefined}
      className={cn(
        mobile ? mobileLinkClass : desktopLinkClass,
        active
          ? "bg-sage text-spruce"
          : "text-muted-ink hover:bg-sage/60 hover:text-spruce"
      )}
      href={item.href}
      onClick={onClick}
    >
      {item.label}
    </Link>
  )
}

function ProfileMenu({ user }: { user: SessionUser }) {
  return (
    <Menu.Root modal={false}>
      <Menu.Trigger className="group flex h-10 items-center gap-2.5 rounded-full border border-line bg-card py-1 pr-3 pl-1 transition-colors outline-none hover:border-line-strong hover:bg-sage/30 focus-visible:ring-2 focus-visible:ring-fern focus-visible:ring-offset-2 focus-visible:ring-offset-paper data-popup-open:bg-sage/50">
        <Avatar name={user.name} size="sm" src={user.image} />
        <span className="max-w-[8rem] truncate text-sm font-semibold text-ink">
          {user.name}
        </span>
        <RoleBadge role={user.role} />
        <ChevronDown
          aria-hidden
          className="size-4 text-muted-ink transition-transform duration-200 group-data-[popup-open]:rotate-180"
        />
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner
          align="end"
          className="z-[60] outline-none"
          sideOffset={10}
        >
          <Menu.Popup className="w-80 origin-[var(--transform-origin)] rounded-xl border border-line bg-card p-1.5 shadow-float transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] outline-none data-ending-style:scale-[0.97] data-ending-style:opacity-0 data-starting-style:scale-[0.97] data-starting-style:opacity-0">
            <div className="flex items-center gap-3 px-3 py-3">
              <Avatar name={user.name} size="md" src={user.image} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">
                  {user.name}
                </p>
                <p className="mt-0.5 truncate text-xs text-muted-ink">
                  {user.email}
                </p>
              </div>
              <RoleBadge role={user.role} />
            </div>

            <Menu.Separator className={menuSeparatorClass} />

            <Menu.LinkItem
              className={menuItemClass}
              closeOnClick
              render={<Link href={ROLE_DASHBOARD[user.role]} />}
            >
              <LayoutDashboard aria-hidden className="size-4" />
              Dashboard
            </Menu.LinkItem>
            <Menu.LinkItem
              className={menuItemClass}
              closeOnClick
              render={<Link href="/dashboard/profile" />}
            >
              <UserRound aria-hidden className="size-4" />
              Update profile
            </Menu.LinkItem>

            <Menu.Separator className={menuSeparatorClass} />

            {/* Presentation-only: authentication is not wired in this prototype. */}
            <Menu.Item
              className={cn(menuItemClass, "text-muted-ink")}
              onClick={() =>
                previewToast("Sign-out is not connected in this preview.")
              }
            >
              <LogOut aria-hidden className="size-4" />
              Sign out
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}

function AuthSkeleton({ mobile = false }: { mobile?: boolean }) {
  if (mobile) {
    return (
      <div aria-hidden className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-36" />
        </div>
      </div>
    )
  }

  return (
    <div aria-hidden className="ml-auto hidden items-center gap-3 lg:flex">
      <Skeleton className="size-8 rounded-full" />
      <Skeleton className="h-3.5 w-24" />
      <Skeleton className="h-5 w-16 rounded-full" />
    </div>
  )
}

function MobilePanel({
  user,
  isAuthLoading,
  pathname,
  onClose,
}: {
  user: SessionUser | null
  isAuthLoading: boolean
  pathname: string
  onClose: () => void
}) {
  return (
    <div
      className="border-t border-line bg-paper lg:hidden"
      id="public-mobile-nav"
    >
      <div className="container-page py-4">
        <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
          {PUBLIC_NAV.map((item) => (
            <NavLink
              active={isNavActive(pathname, item.href)}
              item={item}
              key={item.href}
              mobile
              onClick={onClose}
            />
          ))}
        </nav>

        <div className="mt-4 border-t border-line pt-4">
          {isAuthLoading ? (
            <AuthSkeleton mobile />
          ) : user ? (
            <>
              <div className="flex items-center gap-3">
                <Avatar name={user.name} size="md" src={user.image} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">
                    {user.name}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-ink">
                    {user.email}
                  </p>
                </div>
                <RoleBadge role={user.role} />
              </div>

              <div className="mt-3 flex flex-col gap-1">
                <Link
                  className={mobileActionClass}
                  href={ROLE_DASHBOARD[user.role]}
                  onClick={onClose}
                >
                  <LayoutDashboard
                    aria-hidden
                    className="size-4 text-muted-ink"
                  />
                  Dashboard
                </Link>
                <Link
                  className={mobileActionClass}
                  href="/dashboard/profile"
                  onClick={onClose}
                >
                  <UserRound aria-hidden className="size-4 text-muted-ink" />
                  Update profile
                </Link>
                {/* Presentation-only: authentication is not wired in this prototype. */}
                <button
                  className={cn(mobileActionClass, "w-full text-left")}
                  onClick={() => {
                    onClose()
                    previewToast(
                      "Sign-out is not connected in this preview."
                    )
                  }}
                  type="button"
                >
                  <LogOut aria-hidden className="size-4 text-muted-ink" />
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full"
                )}
                href="/sign-in"
                onClick={onClose}
              >
                Sign in
              </Link>
              <Link
                className={cn(buttonVariants({ size: "lg" }), "w-full")}
                href="/sign-up"
                onClick={onClose}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface PublicNavbarProps {
  user?: SessionUser | null
  isAuthLoading?: boolean
}

export function PublicNavbar({
  user = null,
  isAuthLoading = false,
}: PublicNavbarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobile = () => setMobileOpen(false)
  const closeMobileAndRestoreFocus = () => {
    setMobileOpen(false)
    document.getElementById("mobile-nav-toggle")?.focus()
  }
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape" && mobileOpen) {
      closeMobileAndRestoreFocus()
    }
  }

  return (
    <header
      className="sticky top-0 z-50 border-b border-line bg-paper"
      onKeyDown={handleKeyDown}
    >
      <div className="container-page flex h-16 items-center gap-3 lg:h-[4.5rem] lg:gap-8">
        <Link className="rounded-lg" href="/">
          <Logo />
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {PUBLIC_NAV.map((item) => (
            <NavLink
              active={isNavActive(pathname, item.href)}
              item={item}
              key={item.href}
            />
          ))}
        </nav>

        {isAuthLoading ? (
          <AuthSkeleton />
        ) : user ? (
          <div className="ml-auto hidden items-center lg:flex">
            <ProfileMenu user={user} />
          </div>
        ) : (
          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <Link
              className={buttonVariants({ variant: "ghost", size: "sm" })}
              href="/sign-in"
            >
              Sign in
            </Link>
            <Link className={buttonVariants({ size: "sm" })} href="/sign-up">
              Sign up
            </Link>
          </div>
        )}

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          {isAuthLoading ? (
            <Skeleton className="size-8 rounded-full" />
          ) : user ? (
            <Avatar name={user.name} size="sm" src={user.image} />
          ) : null}

          <button
            aria-controls="public-mobile-nav"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-[0.625rem] border border-line bg-card text-ink transition-colors outline-none hover:bg-sage/60 focus-visible:ring-2 focus-visible:ring-fern focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            id="mobile-nav-toggle"
            onClick={() => setMobileOpen((open) => !open)}
            type="button"
          >
            {mobileOpen ? (
              <X aria-hidden className="size-5" />
            ) : (
              <MenuIcon aria-hidden className="size-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <MobilePanel
          isAuthLoading={isAuthLoading}
          onClose={closeMobile}
          pathname={pathname}
          user={user}
        />
      ) : null}
    </header>
  )
}
