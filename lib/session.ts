import type { SessionUser, UserRole } from "@/types"

export interface SessionProfile extends SessionUser {
  phone?: string
  area?: string
  bio?: string
  createdAt?: string
}

export function toSessionUser(user: {
  id: string
  name: string
  email: string
  role?: string | null
  image?: string | null
}): SessionUser {
  const role: UserRole =
    user.role === "technician" || user.role === "admin"
      ? user.role
      : "customer"

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role,
    image: user.image ?? undefined,
  }
}

export function toSessionProfile(user: {
  id: string
  name: string
  email: string
  role?: string | null
  image?: string | null
  phone?: string | null
  area?: string | null
  bio?: string | null
  createdAt?: string | Date | null
}): SessionProfile {
  return {
    ...toSessionUser(user),
    phone: user.phone ?? "",
    area: user.area ?? "",
    bio: user.bio ?? "",
    createdAt:
      user.createdAt instanceof Date
        ? user.createdAt.toISOString()
        : (user.createdAt ?? undefined),
  }
}
