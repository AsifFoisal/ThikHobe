import "server-only"

import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { ROLE_DASHBOARD } from "@/constants"
import { auth } from "@/lib/auth"
import { toSessionProfile, type SessionProfile } from "@/lib/session"
import type { UserRole } from "@/types"

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "")

export class ServerApiError extends Error {
  constructor(
    readonly status: number,
    message: string
  ) {
    super(message)
    this.name = "ServerApiError"
  }
}

export async function getSessionProfile(): Promise<SessionProfile | null> {
  const requestHeaders = await headers()
  const session = await auth.api
    .getSession({ headers: requestHeaders })
    .catch(() => null)

  return session?.user ? toSessionProfile(session.user) : null
}

export async function requireSessionUser(): Promise<SessionProfile> {
  const user = await getSessionProfile()
  if (!user) redirect("/sign-in")
  return user
}

export async function requireRole(role: UserRole): Promise<SessionProfile> {
  const user = await requireSessionUser()
  if (user.role !== role) redirect(ROLE_DASHBOARD[user.role])
  return user
}

export async function serverApi<T>(
  path: string,
  { auth: requireAuth = false }: { auth?: boolean } = {}
): Promise<T> {
  if (!apiBaseUrl) throw new Error("NEXT_PUBLIC_API_URL is not configured")

  const requestHeaders = await headers()
  const session = await auth.api
    .getSession({ headers: requestHeaders })
    .catch(() => null)

  if (requireAuth && !session) redirect("/sign-in")

  let token: string | undefined
  if (session) {
    try {
      ({ token } = await auth.api.getToken({ headers: requestHeaders }))
    } catch {
      token = undefined
    }
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })

  const text = await response.text()
  let payload: unknown
  try {
    payload = text ? JSON.parse(text) : undefined
  } catch {
    throw new ServerApiError(502, "The API returned an invalid response")
  }

  if (!response.ok) {
    const message =
      typeof payload === "object" &&
      payload !== null &&
      "message" in payload &&
      typeof payload.message === "string"
        ? payload.message
        : "The request could not be completed"
    throw new ServerApiError(response.status, message)
  }

  return payload as T
}
