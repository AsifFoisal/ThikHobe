import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { SignUpForm } from "@/components/auth/sign-up-form"
import { ROLE_DASHBOARD } from "@/constants"
import { getSessionProfile } from "@/lib/server-api"

export const metadata: Metadata = {
  title: "Create your account",
  description:
    "Create a ThikHobe customer or technician account to book repairs, follow progress, and pay after completion.",
}

export default async function SignUpPage({
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

  return <SignUpForm redirectTo={redirectTo ?? null} />
}
