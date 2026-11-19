import Link from "next/link"

import { Logo } from "@/components/layout/logo"

export default function PaymentLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-svh flex-col bg-paper">
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link aria-label="FixMate home" className="rounded-lg" href="/">
            <Logo />
          </Link>
          <Link
            className="rounded-md text-sm font-medium text-muted-ink transition-colors hover:text-fern focus-visible:ring-2 focus-visible:ring-fern focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:outline-none"
            href="/dashboard/customer/bookings"
          >
            My bookings
          </Link>
        </div>
      </header>

      <main
        className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6 sm:py-14"
        id="main"
      >
        {children}
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto w-full max-w-3xl px-4 py-4 sm:px-6">
          <p className="text-center text-xs leading-5 text-muted-ink">
            Sample payment surface · no card data is collected or processed.
          </p>
        </div>
      </footer>
    </div>
  )
}
