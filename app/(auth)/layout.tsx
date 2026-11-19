import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

import { Logo } from "@/components/layout/Logo"
import { BookingStatusBadge } from "@/components/ui/StatusBadge"

const promises = [
  "Verified technicians on every listing",
  "A status you can check at any time",
  "Payment that opens after completion",
]

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-svh bg-paper lg:grid lg:grid-cols-[0.92fr_1.08fr]">
      <aside className="bg-spruce px-5 py-5 text-paper sm:px-8 lg:flex lg:min-h-svh lg:flex-col lg:justify-between lg:px-12 lg:py-10">
        <div>
          <Link
            className="inline-flex w-fit rounded-lg focus-visible:outline-paper"
            href="/"
          >
            <Logo tone="light" />
          </Link>
          <p className="mt-2 text-sm text-sage lg:hidden">Repairs, handled.</p>
        </div>

        <div className="hidden lg:block">
          <p className="type-h1 max-w-[11ch] text-paper">
            The repair stays visible from request to receipt.
          </p>
          <p className="mt-4 max-w-[38ch] text-sm leading-7 text-sage">
            One account keeps the service, the status, and the payment in one
            place.
          </p>
          <ul className="mt-8 space-y-3">
            {promises.map((promise) => (
              <li
                className="flex items-start gap-3 text-sm leading-6 text-sage"
                key={promise}
              >
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-white/10 text-paper">
                  <Check aria-hidden className="size-3" strokeWidth={2.2} />
                </span>
                {promise}
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-xl border border-white/15 bg-white/5 p-4">
            <p className="text-[0.6875rem] font-semibold tracking-[0.12em] text-sage uppercase">
              A repair, in the open
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <BookingStatusBadge status="requested" />
              <BookingStatusBadge status="in_progress" />
              <BookingStatusBadge status="completed" />
            </div>
          </div>
        </div>

        <p className="hidden text-xs text-sage lg:block">
          ThikHobe · Repairs, handled in Bangladesh.
        </p>
      </aside>

      <main
        className="flex min-h-svh flex-col px-5 py-5 sm:px-8 lg:px-12 lg:py-8"
        id="main"
      >
        <div className="flex items-center justify-end">
          <Link
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-ink transition-colors hover:text-spruce"
            href="/"
          >
            <ArrowLeft aria-hidden className="size-4" />
            Back to home
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center py-8">
          {children}
        </div>
        <p className="text-center text-xs text-muted-ink">
          © {new Date().getFullYear()} ThikHobe. Repairs, handled.
        </p>
      </main>
    </div>
  )
}
