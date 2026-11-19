import { ArrowRight, Search, ShieldCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

const progress = [
  { label: "Requested", state: "done" },
  { label: "Accepted", state: "done" },
  { label: "In progress", state: "current" },
  { label: "Completed", state: "pending" },
] as const

export function Hero() {
  return (
    <section className="overflow-hidden">
      <div className="container-page grid gap-12 pt-10 pb-16 sm:pt-14 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:gap-16 lg:pt-20 lg:pb-24">
        <div>
          <h1 className="type-display text-[clamp(2.25rem,3.9vw,3.5rem)]">
            <span className="block">Broken Device?</span>{" "}
            <span className="block">Get It Fixed by</span>{" "}
            <span className="block text-fern">Verified Technicians.</span>
          </h1>
          <p className="type-lead mt-6 max-w-[50ch]">
            Book a vetted technician for your phone, laptop, or home appliance.
            Follow every step in one place—and pay only after the repair is
            complete.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link className={buttonVariants({ size: "lg" })} href="/services">
              Browse services
              <ArrowRight aria-hidden />
            </Link>
            <Link
              className={buttonVariants({ size: "lg", variant: "outline" })}
              href="#how-it-works"
            >
              How it works
            </Link>
          </div>

          <form
            action="/services"
            className="mt-9 max-w-xl"
            method="get"
            role="search"
          >
            <label
              className="text-sm font-medium text-ink"
              htmlFor="hero-search"
            >
              Search repairs
            </label>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-ink"
                />
                <input
                  autoComplete="off"
                  className="h-12 w-full rounded-[0.625rem] border border-line-strong bg-card pr-4 pl-11 text-sm text-ink transition-colors placeholder:text-muted-ink focus-visible:border-fern focus-visible:ring-2 focus-visible:ring-fern/20 focus-visible:outline-none"
                  id="hero-search"
                  name="search"
                  placeholder="iPhone screen, AC service…"
                  type="search"
                />
              </div>
              <button
                className={cn(buttonVariants({ size: "lg" }), "sm:w-auto")}
                type="submit"
              >
                Search
              </button>
            </div>
            <p className="type-meta mt-2">
              Search by device, repair, or category. Results open on the
              services page.
            </p>
          </form>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sage">
            <Image
              alt="A technician replacing a laptop component at a workbench"
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              src="/images/hero-technician.jpg"
            />
            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-spruce px-3 py-1.5 text-xs font-semibold text-paper">
              <ShieldCheck aria-hidden className="size-3.5" />
              Verified technician
            </span>
          </div>

          <div className="mt-4 rounded-xl bg-card p-4 shadow-float xl:absolute xl:right-4 xl:bottom-4 xl:mt-0 xl:w-72">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[0.6875rem] font-semibold tracking-[0.12em] text-muted-ink uppercase">
                Repair progress
              </p>
              <span className="tabular text-[0.6875rem] text-muted-ink">
                #FM-2481
              </span>
            </div>
            <p className="mt-1.5 text-sm font-semibold text-ink">
              Laptop screen replacement
            </p>
            <div aria-hidden className="mt-3 flex items-center gap-1">
              {progress.map((step, index) => (
                <div
                  className="flex flex-1 items-center gap-1"
                  key={step.label}
                >
                  <span
                    className={cn(
                      "size-2 shrink-0 rounded-full",
                      step.state === "current"
                        ? "bg-ember"
                        : step.state === "done"
                          ? "bg-fern"
                          : "bg-line-strong"
                    )}
                  />
                  {index < progress.length - 1 ? (
                    <span
                      className={cn(
                        "h-px flex-1",
                        index < 2 ? "bg-fern/60" : "bg-line"
                      )}
                    />
                  ) : null}
                </div>
              ))}
            </div>
            <div className="mt-1.5 grid grid-cols-4 gap-1 text-[0.6875rem] leading-4 text-muted-ink">
              <span>Requested</span>
              <span>Accepted</span>
              <span className="font-semibold text-ember-ink">In progress</span>
              <span>Completed</span>
            </div>
            <div className="mt-3 flex items-center gap-1.5 border-t border-line pt-3 text-xs text-muted-ink">
              <ShieldCheck aria-hidden className="size-3.5 text-fern" />
              Pay unlocks after completion
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
