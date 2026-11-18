import {
  AirVent,
  ArrowRight,
  ArrowUpRight,
  Laptop,
  LayoutGrid,
  Refrigerator,
  Smartphone,
  Tv,
  WashingMachine,
  Zap,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"

import { SectionHeading } from "@/components/ui/section-heading"
import { SERVICE_CATEGORIES } from "@/constants"
import type { ServiceCategory } from "@/types"

const categoryIcons: Record<ServiceCategory, LucideIcon> = {
  Smartphone,
  "Laptop & PC": Laptop,
  AC: AirVent,
  Refrigerator,
  TV: Tv,
  "Washing Machine": WashingMachine,
  Electrical: Zap,
}

export function PopularCategories() {
  return (
    <section className="section" id="categories">
      <div className="container-page">
        <SectionHeading
          action={
            <Link
              className="group inline-flex items-center gap-2 text-sm font-semibold text-spruce transition-colors hover:text-fern"
              href="/services"
            >
              All services
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          }
          description="Start with the device or appliance, then compare verified services near you."
          title="What needs fixing?"
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {SERVICE_CATEGORIES.map((category) => {
            const Icon = categoryIcons[category]
            return (
              <Link
                className="group flex min-h-[8.75rem] flex-col justify-between rounded-xl border border-line bg-card p-5 transition-colors duration-200 hover:border-spruce/30 hover:bg-sage/40"
                href={`/services?category=${encodeURIComponent(category)}`}
                key={category}
              >
                <span className="grid size-10 place-items-center rounded-[0.625rem] bg-sage text-spruce transition-colors duration-200 group-hover:bg-sage-strong">
                  <Icon aria-hidden className="size-5" strokeWidth={1.9} />
                </span>
                <span className="flex items-end justify-between gap-3">
                  <span className="text-sm font-semibold tracking-[-0.01em] text-ink sm:text-base">
                    {category}
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 shrink-0 text-muted-ink transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-spruce"
                  />
                </span>
              </Link>
            )
          })}

          <Link
            className="group flex min-h-[8.75rem] flex-col justify-between rounded-xl bg-spruce p-5 text-paper transition-colors duration-200 hover:bg-spruce/90 focus-visible:outline-paper"
            href="/services"
          >
            <span className="grid size-10 place-items-center rounded-[0.625rem] bg-white/10 text-paper">
              <LayoutGrid aria-hidden className="size-5" strokeWidth={1.9} />
            </span>
            <span className="flex items-end justify-between gap-3">
              <span className="text-sm font-semibold tracking-[-0.01em] sm:text-base">
                All services
              </span>
              <ArrowUpRight
                aria-hidden
                className="size-4 shrink-0 text-sage transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-paper"
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
