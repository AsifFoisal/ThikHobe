import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { SignInForm } from "@/components/auth/SignInForm"
import { ROLE_DASHBOARD } from "@/constants"
import { getSessionProfile } from "@/lib/server-api"

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in to ThikHobe to follow repair progress, manage bookings, and pay after completion.",
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string | string[] }>
}) {
  const user = await getSessionProfile()
  if (user) redirect(ROLE_DASHBOARD[user.role])

  const params = await searchParams
  const redirectTo = Array.isArray(params.redirect)
    ? params.redirect[0]
    : params.redirect

  return <SignInForm redirectTo={redirectTo ?? null} />
}
