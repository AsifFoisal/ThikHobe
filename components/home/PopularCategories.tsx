import { ArrowRight, ArrowUpRight, LayoutGrid } from "lucide-react"
import Link from "next/link"

import { CATEGORY_ICONS } from "@/components/services/CategoryIcons"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { SERVICE_CATEGORIES } from "@/constants"
import { formatPrice } from "@/lib/format"
import { getPublicServices } from "@/lib/server-data"
import type { ServiceCategory } from "@/types"

const CATEGORY_DETAILS: Record<ServiceCategory, string> = {
  Smartphone: "Screens, batteries, charging ports",
  "Laptop & PC": "Boards, keyboards, memory upgrades",
  AC: "Servicing, gas refills, installations",
  Refrigerator: "Cooling faults, seals, compressors",
  TV: "Panels, backlights, wall mounting",
  "Washing Machine": "Drums, pumps, belts and seals",
  Electrical: "Wiring, fans, safety inspections",
}

interface CategorySummary {
  count: number
  from: number
}

export async function PopularCategories() {
  const { items } = await getPublicServices({ limit: 50 })
  const summaries = new Map<ServiceCategory, CategorySummary>()

  for (const service of items) {
    const current = summaries.get(service.category)
    summaries.set(service.category, {
      count: (current?.count ?? 0) + 1,
      from: Math.min(current?.from ?? service.basePrice, service.basePrice),
    })
  }

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
            const Icon = CATEGORY_ICONS[category]
            const summary = summaries.get(category)

            return (
              <Link
                className="group flex min-h-[11.5rem] flex-col rounded-xl border border-line bg-card p-4 transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-spruce/30 hover:bg-sage/40 active:translate-y-0 sm:p-5"
                href={`/services?category=${encodeURIComponent(category)}`}
                key={category}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="grid size-10 place-items-center rounded-[0.625rem] bg-sage text-spruce transition-colors duration-200 group-hover:bg-sage-strong">
                    <Icon aria-hidden className="size-5" strokeWidth={1.9} />
                  </span>
                  <span className="rounded-full bg-paper px-2 py-1 text-[0.625rem] leading-none font-medium text-muted-ink ring-1 ring-line sm:text-[0.6875rem]">
                    {summary
                      ? `${summary.count} ${summary.count === 1 ? "service" : "services"}`
                      : "New"}
                  </span>
                </div>

                <h3 className="mt-4 text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink sm:text-base">
                  {category}
                </h3>
                <p className="mt-1 text-[0.6875rem] leading-[1.15rem] text-muted-ink sm:text-xs sm:leading-5">
                  {CATEGORY_DETAILS[category]}
                </p>

                <div className="mt-auto flex items-center justify-between gap-2 border-t border-line pt-3">
                  <span className="text-[0.6875rem] text-muted-ink sm:text-xs">
                    {summary ? (
                      <>
                        From{" "}
                        <span className="tabular font-semibold text-ink">
                          {formatPrice(summary.from)}
                        </span>
                      </>
                    ) : (
                      "Check back soon"
                    )}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[0.6875rem] font-semibold text-spruce sm:text-xs">
                    <span className="hidden sm:inline">Browse</span>
                    <ArrowRight
                      aria-hidden
                      className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            )
          })}

          <Link
            className="group flex min-h-[11.5rem] flex-col rounded-xl bg-spruce p-4 text-paper transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-spruce/90 focus-visible:outline-paper active:translate-y-0 sm:p-5"
            href="/services"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="grid size-10 place-items-center rounded-[0.625rem] bg-white/10 text-paper">
                <LayoutGrid aria-hidden className="size-5" strokeWidth={1.9} />
              </span>
              <span className="rounded-full bg-white/10 px-2 py-1 text-[0.625rem] leading-none font-medium text-sage ring-1 ring-white/15 sm:text-[0.6875rem]">
                {items.length} services
              </span>
            </div>

            <h3 className="mt-4 text-[0.9375rem] font-semibold tracking-[-0.01em] sm:text-base">
              All services
            </h3>
            <p className="mt-1 text-[0.6875rem] leading-[1.15rem] text-paper/70 sm:text-xs sm:leading-5">
              Every category in one searchable list.
            </p>

            <div className="mt-auto flex items-center justify-between gap-2 border-t border-white/15 pt-3">
              <span className="text-[0.6875rem] text-paper/70 sm:text-xs">
                {SERVICE_CATEGORIES.length} categories
              </span>
              <span className="inline-flex items-center gap-1 text-[0.6875rem] font-semibold text-sage sm:text-xs">
                <span className="hidden sm:inline">View all</span>
                <ArrowUpRight
                  aria-hidden
                  className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
