import {
  CalendarDays,
  CreditCard,
  Inbox,
  LayoutDashboard,
  ListChecks,
  Plus,
  ReceiptText,
  UserRound,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react"

import type { UserRole } from "@/types"

export interface DashboardNavItem {
  label: string
  href: string
  icon: LucideIcon
}

export const DASHBOARD_NAV = {
  customer: [
    { label: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
    {
      label: "My bookings",
      href: "/dashboard/customer/bookings",
      icon: CalendarDays,
    },
    {
      label: "Payments",
      href: "/dashboard/customer/payments",
      icon: CreditCard,
    },
    { label: "Profile", href: "/dashboard/profile", icon: UserRound },
  ],
  technician: [
    {
      label: "Overview",
      href: "/dashboard/technician",
      icon: LayoutDashboard,
    },
    {
      label: "Add service",
      href: "/dashboard/technician/add-service",
      icon: Plus,
    },
    {
      label: "My services",
      href: "/dashboard/technician/my-services",
      icon: Wrench,
    },
    {
      label: "Requests",
      href: "/dashboard/technician/requests",
      icon: Inbox,
    },
    { label: "Profile", href: "/dashboard/profile", icon: UserRound },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Users", href: "/dashboard/admin/users", icon: Users },
    {
      label: "Services",
      href: "/dashboard/admin/services",
      icon: ListChecks,
    },
    {
      label: "Bookings",
      href: "/dashboard/admin/bookings",
      icon: CalendarDays,
    },
    {
      label: "Transactions",
      href: "/dashboard/admin/transactions",
      icon: ReceiptText,
    },
    { label: "Profile", href: "/dashboard/profile", icon: UserRound },
  ],
} satisfies Record<UserRole, DashboardNavItem[]>

export const DASHBOARD_WORKSPACE_LABEL = {
  customer: "Customer workspace",
  technician: "Technician workspace",
  admin: "Admin workspace",
} satisfies Record<UserRole, string>
