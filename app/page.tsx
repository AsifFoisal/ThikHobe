import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"

import { Logo } from "@/components/layout/logo"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  BookingStatusBadge,
  PaymentStatusBadge,
} from "@/components/ui/status-badge"

export const metadata: Metadata = {
  title: "Design foundation",
  description:
    "The FixMate design foundation: three brand colors, one typeface, and shared components.",
}

const palette = [
  {
    role: "Primary",
    name: "Spruce",
    token: "spruce",
    hex: "#0D4436",
    note: "Navigation, primary actions, and deep surfaces",
    className: "bg-spruce text-paper",
    muted: "text-sage",
  },
  {
    role: "Secondary",
    name: "Fern",
    token: "fern",
    hex: "#2E6B55",
    note: "Supporting emphasis, charts, and iconography",
    className: "bg-fern text-paper",
    muted: "text-sage",
  },
  {
    role: "Accent",
    name: "Ember",
    token: "ember",
    hex: "#E86F3A",
    note: "Live-wire highlights and moments of warmth",
    className: "bg-ember text-ink",
    muted: "text-ink",
  },
] as const

export default function FoundationPage() {
  return (
    <div className="min-h-svh">
      <header className="border-b border-line">
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
          <Logo />
          <Badge tone="brand">Foundation · Phase 01</Badge>
        </div>
      </header>

      <main id="main">
        <section className="container-page grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-24">
          <div>
            <h1 className="type-display max-w-[13ch]">
              A calmer way to fix what breaks.
            </h1>
            <p className="type-lead mt-6 max-w-[46ch]">
              Deep spruce, quiet sage, and a live-wire ember. One steady
              typeface. This is the foundation every FixMate page and dashboard
              is built from.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <span className={buttonVariants({ size: "lg" })}>
                Request a repair
                <ArrowRight aria-hidden />
              </span>
              <span
                className={buttonVariants({ size: "lg", variant: "secondary" })}
              >
                Browse services
              </span>
              <span
                className={buttonVariants({ size: "lg", variant: "outline" })}
              >
                How it works
              </span>
            </div>
            <p className="type-meta mt-5">
              Component specimens — interactive actions arrive with their pages.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-line bg-card">
            {palette.map((color) => (
              <div
                key={color.token}
                className={`flex min-h-40 flex-col justify-between p-6 ${color.className}`}
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="text-[0.6875rem] font-semibold tracking-[0.14em] uppercase">
                    {color.role}
                  </span>
                  <span className={`tabular text-xs ${color.muted}`}>
                    {color.hex}
                  </span>
                </div>
                <div className="mt-8">
                  <p className="text-2xl font-semibold tracking-[-0.025em]">
                    {color.name}
                  </p>
                  <p className={`mt-1.5 text-sm ${color.muted}`}>
                    {color.note}
                  </p>
                  <p className={`mt-3 text-xs ${color.muted}`}>
                    --{color.token}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-6 py-4 text-xs text-muted-ink">
              <span>3 core colors</span>
              <span
                aria-hidden
                className="size-1 rounded-full bg-line-strong"
              />
              <span>1 typeface</span>
              <span
                aria-hidden
                className="size-1 rounded-full bg-line-strong"
              />
              <span>1 shared system</span>
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-card">
          <div className="container-page grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-20">
            <div>
              <div className="flex flex-wrap items-end gap-x-8 gap-y-4 border-b border-line pb-6">
                <span className="text-[8rem] leading-[0.75] font-bold tracking-[-0.06em]">
                  Aa
                </span>
                <div className="pb-1">
                  <p className="text-base font-semibold">Hanken Grotesk</p>
                  <p className="mt-1 text-sm text-muted-ink">
                    Variable weight · 400–700
                  </p>
                  <p className="mt-1 text-sm text-muted-ink">
                    Latin, with a Bengali-compatible fallback
                  </p>
                </div>
              </div>

              <h2 className="type-h2 mt-8">Engineered for clarity.</h2>
              <p className="mt-4 max-w-prose text-[0.9375rem] leading-7 text-muted-ink">
                A humanist grotesque with crisp numerals and a friendly, precise
                voice. Tight display tracking carries headlines; relaxed body
                leading keeps long service descriptions and dashboard tables
                easy to read.
              </p>

              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 text-sm">
                <span className="font-normal">Regular</span>
                <span className="font-medium">Medium</span>
                <span className="font-semibold">Semibold</span>
                <span className="font-bold">Bold</span>
              </div>
            </div>

            <Card className="p-6 sm:p-8">
              <div className="space-y-8">
                <div>
                  <h3 className="type-label">Controls</h3>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className={buttonVariants()}>Primary</span>
                    <span className={buttonVariants({ variant: "secondary" })}>
                      Secondary
                    </span>
                    <span className={buttonVariants({ variant: "outline" })}>
                      Outline
                    </span>
                    <span className={buttonVariants({ variant: "ghost" })}>
                      Ghost
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-muted-ink">
                    40px default · 48px large · 10px radius
                  </p>
                </div>

                <div>
                  <h3 className="type-label">Status language</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <BookingStatusBadge status="requested" />
                    <BookingStatusBadge status="in_progress" />
                    <BookingStatusBadge status="completed" />
                    <BookingStatusBadge status="rejected" />
                    <PaymentStatusBadge status="paid" />
                  </div>
                </div>

                <div>
                  <h3 className="type-label">Loading</h3>
                  <div className="mt-4 space-y-2.5">
                    <Skeleton className="h-3 w-2/3" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-4/5" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="container-page py-12">
          <div className="flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="type-h3">Foundation complete</p>
              <p className="mt-1 text-sm text-muted-ink">
                Public pages, dashboards, and shared flows build on these
                primitives.
              </p>
            </div>
            <p className="type-meta">Phase 01 · Foundation</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted-ink sm:flex-row sm:items-center sm:justify-between">
          <p>FixMate design foundation</p>
          <p>Frontend prototype · 2026</p>
        </div>
      </footer>
    </div>
  )
}
