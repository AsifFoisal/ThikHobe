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
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import { toast } from "sonner"

import { Logo } from "@/components/layout/Logo"
import { Avatar } from "@/components/ui/Avatar"
import { RoleBadge } from "@/components/ui/RoleBadge"
import { Skeleton } from "@/components/ui/Skeleton"
import { PUBLIC_NAV, ROLE_DASHBOARD } from "@/constants"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import type { SessionUser } from "@/types"

type NavItem = (typeof PUBLIC_NAV)[number]

const desktopLinkClass =
  "relative z-10 inline-flex h-10 items-center rounded-full px-5 text-sm font-medium transition-colors duration-200"
const mobileActionClass =
  "flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-white/60 hover:text-spruce"
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
  if (mobile) {
    return (
      <Link
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex min-h-11 items-center rounded-full px-4 text-[0.9375rem] font-medium transition-colors duration-200",
          active
            ? "neu-pill font-semibold text-spruce"
            : "text-muted-ink hover:bg-white/60 hover:text-spruce"
        )}
        href={item.href}
        onClick={onClick}
      >
        {item.label}
      </Link>
    )
  }

  return (
    <Link
      aria-current={active ? "page" : undefined}
      className={cn(
        desktopLinkClass,
        active ? "text-spruce" : "text-muted-ink hover:text-spruce"
      )}
      data-active={active ? "true" : undefined}
      href={item.href}
    >
      {item.label}
    </Link>
  )
}

function DesktopNav({ pathname }: { pathname: string }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const track = trackRef.current

    if (!track) {
      return
    }

    const measure = () => {
      const activeLink = track.querySelector<HTMLElement>(
        '[data-active="true"]'
      )

      if (activeLink) {
        setPill({
          left: activeLink.offsetLeft,
          width: activeLink.offsetWidth,
        })
      }
    }

    measure()

    const frame = requestAnimationFrame(() => setAnimated(true))
    const observer = new ResizeObserver(measure)

    observer.observe(track)
    void document.fonts.ready.then(measure).catch(() => {})

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [pathname])

  return (
    <nav aria-label="Main navigation" className="hidden lg:block">
      <div
        className="neu-tray relative flex items-center rounded-full p-1.5"
        ref={trackRef}
      >
        <span
          aria-hidden
          className={cn(
            "neu-pill pointer-events-none absolute top-1.5 bottom-1.5 left-0 rounded-full",
            animated
              ? "transition-[transform,width] duration-[350ms] ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none"
              : "transition-none",
            pill ? "opacity-100" : "opacity-0"
          )}
          style={{
            transform: `translateX(${pill?.left ?? 0}px)`,
            width: pill?.width ?? 0,
          }}
        />

        {PUBLIC_NAV.map((item) => (
          <NavLink
            active={isNavActive(pathname, item.href)}
            item={item}
            key={item.href}
          />
        ))}
      </div>
    </nav>
  )
}

function ProfileMenu({
  user,
  onSignOut,
}: {
  user: SessionUser
  onSignOut: () => void
}) {
  return (
    <Menu.Root modal={false}>
      <Menu.Trigger className="group neu-pill neu-pill-hover flex h-10 items-center gap-2.5 rounded-full py-1 pr-3 pl-1 outline-none focus-visible:ring-2 focus-visible:ring-fern focus-visible:ring-offset-2 focus-visible:ring-offset-paper data-popup-open:bg-sage/60">
        <Avatar name={user.name} size="sm" src={user.image} />
        <span className="max-w-[7.5rem] truncate text-sm font-semibold text-ink">
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

            <Menu.Item
              className={cn(menuItemClass, "text-muted-ink")}
              onClick={onSignOut}
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

  return <Skeleton className="h-[3.25rem] w-52 rounded-full" />
}

function MobilePanel({
  user,
  isAuthLoading,
  pathname,
  onClose,
  onSignOut,
}: {
  user: SessionUser | null
  isAuthLoading: boolean
  pathname: string
  onClose: () => void
  onSignOut: () => void
}) {
  return (
    <div
      className="border-t border-line bg-paper lg:hidden"
      id="public-mobile-nav"
    >
      <div className="container-page py-4">
        <nav
          aria-label="Mobile navigation"
          className="neu-tray flex flex-col gap-0.5 rounded-3xl p-1.5"
        >
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
              <div className="neu-pill flex items-center gap-3 rounded-2xl p-3">
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
                <button
                  className={cn(mobileActionClass, "w-full text-left")}
                  onClick={() => {
                    onClose()
                    onSignOut()
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
                className="neu-pill neu-pill-hover flex h-12 items-center justify-center rounded-full text-sm font-semibold text-ink"
                href="/sign-in"
                onClick={onClose}
              >
                Sign in
              </Link>
              <Link
                className="neu-cta flex h-12 items-center justify-center rounded-full text-sm font-semibold"
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
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isHome = pathname === "/"

  useEffect(() => {
    if (!isHome) {
      return
    }

    const updateScrolled = () => setScrolled(window.scrollY > 8)

    updateScrolled()
    window.addEventListener("scroll", updateScrolled, { passive: true })

    return () => window.removeEventListener("scroll", updateScrolled)
  }, [isHome])

  const handleSignOut = async () => {
    try {
      await authClient.signOut()
      toast.success("Signed out")
    } finally {
      router.refresh()
    }
  }

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

  const overlayHeader = isHome && !scrolled && !mobileOpen

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow] duration-200 ease-out",
        overlayHeader
          ? "bg-transparent"
          : "bg-paper shadow-[inset_0_-1px_0_var(--line)]"
      )}
      onKeyDown={handleKeyDown}
    >
      <div className="container-page grid h-16 grid-cols-[1fr_auto] items-center gap-4 lg:h-[4.5rem] lg:grid-cols-[1fr_auto_1fr]">
        <Link className="w-fit rounded-lg" href="/">
          <Logo tone={overlayHeader ? "light" : "default"} />
        </Link>

        <DesktopNav pathname={pathname} />

        <div className="hidden justify-self-end lg:flex">
          {isAuthLoading ? (
            <AuthSkeleton />
          ) : user ? (
            <div className="neu-tray rounded-full p-1.5">
              <ProfileMenu onSignOut={handleSignOut} user={user} />
            </div>
          ) : (
            <div className="neu-tray flex items-center gap-1 rounded-full p-1.5">
              <Link
                className="inline-flex h-10 items-center rounded-full px-3.5 text-sm font-medium text-muted-ink transition-colors hover:bg-white/60 hover:text-spruce"
                href="/sign-in"
              >
                Sign in
              </Link>
              <Link
                className="neu-cta inline-flex h-10 items-center rounded-full px-5 text-sm font-semibold"
                href="/sign-up"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 justify-self-end lg:hidden">
          {isAuthLoading ? (
            <Skeleton className="size-8 rounded-full" />
          ) : user ? (
            <Avatar name={user.name} size="sm" src={user.image} />
          ) : null}

          <div className="neu-tray rounded-full p-1">
            <button
              aria-controls="public-mobile-nav"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="neu-pill neu-pill-hover grid size-10 place-items-center rounded-full text-ink outline-none focus-visible:ring-2 focus-visible:ring-fern focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
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
      </div>

      {mobileOpen ? (
        <MobilePanel
          isAuthLoading={isAuthLoading}
          onClose={closeMobile}
          onSignOut={handleSignOut}
          pathname={pathname}
          user={user}
        />
      ) : null}
    </header>
  )
}
