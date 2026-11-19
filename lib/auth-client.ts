import { createAuthClient } from "better-auth/react"
import {
  inferAdditionalFields,
  jwtClient,
} from "better-auth/client/plugins"

import type { auth } from "@/lib/auth"

export const authClient = createAuthClient({
  plugins: [jwtClient(), inferAdditionalFields<typeof auth>()],
})

export async function getAuthToken() {
  const { data, error } = await authClient.token()
  return error ? null : (data?.token ?? null)
}
