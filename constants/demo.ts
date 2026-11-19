import type { SessionUser } from "@/types"

/** Presentation-only sample accounts for interface previews. */
export const DEMO_USER = {
  id: "demo-customer",
  name: "Arif Rahman",
  email: "arif.rahman@example.com",
  role: "customer",
} as const satisfies SessionUser

export const DEMO_TECHNICIAN = {
  id: "tech-rafiul",
  name: "Rafiul Islam",
  email: "rafiul.islam@example.com",
  role: "technician",
} as const satisfies SessionUser

export const DEMO_ADMIN = {
  id: "demo-admin",
  name: "Nabil Hasan",
  email: "nabil.hasan@example.com",
  role: "admin",
} as const satisfies SessionUser
