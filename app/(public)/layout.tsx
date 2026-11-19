import { PublicNavbar } from "@/components/layout/PublicNavbar"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { getSessionProfile } from "@/lib/server-api"

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getSessionProfile()

  return (
    <div className="flex min-h-svh flex-col">
      <PublicNavbar user={user} />
      <main className="flex-1" id="main">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
