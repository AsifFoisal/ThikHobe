import { headers } from "next/headers"

import { PublicNavbar } from "@/components/layout/public-navbar"
import { SiteFooter } from "@/components/layout/site-footer"
import { auth } from "@/lib/auth"
import { toSessionUser } from "@/lib/session"

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth.api
    .getSession({ headers: await headers() })
    .catch(() => null)

  return (
    <div className="flex min-h-svh flex-col">
      <PublicNavbar user={session?.user ? toSessionUser(session.user) : null} />
      <main className="flex-1" id="main">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
