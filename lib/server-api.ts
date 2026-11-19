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

type AuthSession = NonNullable<
  Awaited<ReturnType<typeof auth.api.getSession>>
>

const sessionCookiePattern =
  /(?:^|;\s*)(?:__Secure-)?better-auth\.session_token=/

// A transient auth/database failure must not be treated as a signed-out user.
async function getSessionResult(): Promise<{
  session: AuthSession | null
  error: unknown
}> {
  const requestHeaders = await headers()
  const expectsSession = sessionCookiePattern.test(
    requestHeaders.get("cookie") ?? ""
  )

  try {
    const session = await auth.api.getSession({ headers: requestHeaders })
    if (session || !expectsSession) return { session, error: null }
  } catch {
    return retrySession(requestHeaders)
  }

  return retrySession(requestHeaders)
}

async function retrySession(
  requestHeaders: Awaited<ReturnType<typeof headers>>
): Promise<{
  session: AuthSession | null
  error: unknown
}> {
  await new Promise((resolve) => setTimeout(resolve, 150))
  try {
    return {
      session: await auth.api.getSession({ headers: requestHeaders }),
      error: null,
    }
  } catch (error) {
    return { session: null, error }
  }
}

export async function getSessionProfile(): Promise<SessionProfile | null> {
  const { session } = await getSessionResult()
  return session?.user ? toSessionProfile(session.user) : null
}

export async function requireSessionUser(): Promise<SessionProfile> {
  const { session, error } = await getSessionResult()
  if (error) throw error

  if (!session?.user) redirect("/sign-in")
  return toSessionProfile(session.user)
}

export async function requireRole(role: UserRole): Promise<SessionProfile> {
  const user = await requireSessionUser()
  if (user.role !== role) redirect(ROLE_DASHBOARD[user.role])
  return user
}

// Server components forward the Better Auth JWT; private pages never call Express anonymously.
export async function serverApi<T>(
  path: string,
  { auth: requireAuth = false }: { auth?: boolean } = {}
): Promise<T> {
  if (!apiBaseUrl) throw new Error("NEXT_PUBLIC_API_URL is not configured")

  const requestHeaders = await headers()
  const { session, error } = await getSessionResult()

  if (requireAuth && error) throw error
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
