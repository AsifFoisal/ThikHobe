import type { SessionUser } from "@/types"

/** Presentation-only sample account for interface previews. */
export const DEMO_USER = {
  id: "demo-customer",
  name: "Arif Rahman",
  email: "arif.rahman@example.com",
  role: "customer",
} as const satisfies SessionUser
