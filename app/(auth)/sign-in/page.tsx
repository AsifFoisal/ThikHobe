import type { Metadata } from "next"

import { SignInForm } from "@/components/auth/sign-in-form"

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in to FixMate to follow repair progress, manage bookings, and pay after completion.",
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string | string[] }>
}) {
  const params = await searchParams
  const redirectTo = Array.isArray(params.redirect)
    ? params.redirect[0]
    : params.redirect

  return <SignInForm redirectTo={redirectTo ?? null} />
}
