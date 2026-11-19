import type { Metadata } from "next"

import { SignUpForm } from "@/components/auth/sign-up-form"

export const metadata: Metadata = {
  title: "Create your account",
  description:
    "Create a FixMate customer or technician account to book repairs, follow progress, and pay after completion.",
}

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string | string[] }>
}) {
  const params = await searchParams
  const redirectTo = Array.isArray(params.redirect)
    ? params.redirect[0]
    : params.redirect

  return <SignUpForm redirectTo={redirectTo ?? null} />
}
