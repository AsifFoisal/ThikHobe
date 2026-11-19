import { apiRequest } from "@/lib/api/client"
import type { SessionUser } from "@/types"

export interface AuthSession {
  user: SessionUser
  expiresAt?: string
}

export interface SignInInput {
  email: string
  password: string
}

export interface SignUpInput extends SignInInput {
  name: string
  role: "customer" | "technician"
}

export const authApi = {
  getSession(signal?: AbortSignal) {
    return apiRequest<AuthSession | null>("/auth/session", { signal })
  },

  signIn(input: SignInInput) {
    return apiRequest<AuthSession>("/auth/sign-in", {
      method: "POST",
      body: input,
    })
  },

  signUp(input: SignUpInput) {
    return apiRequest<AuthSession>("/auth/sign-up", {
      method: "POST",
      body: input,
    })
  },

  signOut() {
    return apiRequest<void>("/auth/sign-out", { method: "POST" })
  },

  syncSession() {
    return apiRequest<AuthSession>("/auth/session/sync", { method: "POST" })
  },
}
