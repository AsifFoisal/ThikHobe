import type {
  BadgeTone,
  BookingStatus,
  PaymentStatus,
  ServiceApprovalStatus,
  ServiceCategory,
  ServiceMode,
  UserRole,
} from "@/types"

export const SERVICE_CATEGORIES = [
  "Smartphone",
  "Laptop & PC",
  "AC",
  "Refrigerator",
  "TV",
  "Washing Machine",
  "Electrical",
] as const satisfies readonly ServiceCategory[]

export const SERVICE_MODES = [
  "Home Visit",
  "Shop Drop-off",
] as const satisfies readonly ServiceMode[]

export const BOOKING_STATUS_META = {
  requested: { label: "Requested", tone: "blue" },
  accepted: { label: "Accepted", tone: "indigo" },
  in_progress: { label: "In Progress", tone: "amber" },
  completed: { label: "Completed", tone: "green" },
  rejected: { label: "Rejected", tone: "red" },
  cancelled: { label: "Cancelled", tone: "gray" },
} satisfies Record<BookingStatus, { label: string; tone: BadgeTone }>

export const PAYMENT_STATUS_META = {
  unpaid: { label: "Unpaid", tone: "neutral" },
  paid: { label: "Paid", tone: "green" },
} satisfies Record<PaymentStatus, { label: string; tone: BadgeTone }>

export const APPROVAL_STATUS_META = {
  pending: { label: "Pending", tone: "amber" },
  approved: { label: "Approved", tone: "green" },
  rejected: { label: "Rejected", tone: "red" },
} satisfies Record<ServiceApprovalStatus, { label: string; tone: BadgeTone }>

export const ROLE_LABELS = {
  customer: "Customer",
  technician: "Technician",
  admin: "Admin",
} satisfies Record<UserRole, string>

export const ROLE_DASHBOARD = {
  customer: "/dashboard/customer",
  technician: "/dashboard/technician",
  admin: "/dashboard/admin",
} as const

export const PUBLIC_NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "How it works", href: "/about" },
] as const
