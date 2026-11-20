import {
  ArrowRight,
  BadgeCheck,
  MapPin,
  ShieldCheck,
  Wallet,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

const trustBadges = [
  { label: "Verified technicians", icon: ShieldCheck },
  { label: "Upfront pricing", icon: Wallet },
  { label: "Pay after completion", icon: BadgeCheck },
  { label: "Home & shop visits", icon: MapPin },
] as const

export function Hero() {
  return (
    <section className="relative isolate -mt-16 overflow-hidden bg-spruce text-paper lg:-mt-[4.5rem]">
      <Image
        alt="A technician repairing a laptop at a workbench"
        className="object-cover object-center"
        fill
        priority
        sizes="100vw"
        src="/images/hero-technician.jpg"
      />
      <div aria-hidden className="absolute inset-0 bg-spruce/85" />

      <div className="relative pt-16 lg:pt-[4.5rem]">
        <div className="container-page flex min-h-[36rem] flex-col items-center justify-center py-16 text-center sm:min-h-[40rem] sm:py-20 lg:min-h-[44rem]">
          <h1 className="type-display max-w-4xl text-[clamp(2rem,5.2vw,4.25rem)] leading-[1.04] text-paper">
            <span className="block">Fast, reliable repairs.</span>
            <span className="block">Anytime you need us.</span>
          </h1>

          <p className="mt-5 max-w-[38rem] text-base leading-7 text-paper/85 sm:text-lg">
            Certified technicians for phones, laptops, and home appliances.
            Upfront pricing, visible progress, and payment only after the work
            is done.
          </p>

          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Link
              className={cn(
                buttonVariants({ variant: "accent", size: "lg" }),
                "w-full sm:w-auto"
              )}
              href="/services"
            >
              Browse services
              <ArrowRight aria-hidden />
            </Link>
            <Link
              className="inline-flex h-12 w-full items-center justify-center rounded-[0.625rem] border border-paper/35 px-5 text-[0.9375rem] font-semibold text-paper transition-colors duration-200 outline-none hover:border-paper/70 hover:bg-paper/10 focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-spruce sm:w-auto"
              href="#how-it-works"
            >
              How it works
            </Link>
          </div>

          <ul
            aria-label="Why book with ThikHobe"
            className="mt-10 flex flex-wrap items-center justify-center gap-2.5"
          >
            {trustBadges.map(({ icon: Icon, label }) => (
              <li
                className="inline-flex items-center gap-2 rounded-full bg-paper py-1.5 pr-4 pl-1.5 text-xs font-medium text-ink sm:text-[0.8125rem]"
                key={label}
              >
                <span className="grid size-6 place-items-center rounded-full bg-sage text-spruce">
                  <Icon aria-hidden className="size-3.5" strokeWidth={2.25} />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
