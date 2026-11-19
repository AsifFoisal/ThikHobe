import { PublicNavbar } from "@/components/layout/public-navbar"
import { SiteFooter } from "@/components/layout/site-footer"
import { DEMO_USER } from "@/constants/demo"

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-svh flex-col">
      <PublicNavbar user={DEMO_USER} />
      <main className="flex-1" id="main">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
