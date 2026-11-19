import { ArrowRight, ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { CATEGORY_ICONS } from "@/components/services/category-icons"
import { SectionHeading } from "@/components/ui/section-heading"
import { SERVICE_CATEGORIES } from "@/constants"
import type { ServiceCategory } from "@/types"

const categoryDescriptions: Record<ServiceCategory, string> = {
  Smartphone:
    "Screens, batteries, charging ports, and board-level phone faults.",
  "Laptop & PC":
    "Diagnostics, batteries, keyboards, power supplies, and data recovery.",
  AC: "Servicing, gas refills, installation, and cooling faults.",
  Refrigerator: "Cooling loss, leaks, thermostats, and compressor issues.",
  TV: "Panels, backlights, main boards, mounting, and setup.",
  "Washing Machine": "Drums, motors, drainage, seals, and control faults.",
  Electrical: "Wiring, breakers, fans, lights, and electrical safety checks.",
}

export function AboutCategories() {
  return (
    <section className="section scroll-mt-24" id="categories">
      <div className="container-page">
        <SectionHeading
          action={
            <Link
              className="group inline-flex items-center gap-2 text-sm font-semibold text-spruce transition-colors hover:text-fern"
              href="/services"
            >
              Browse all services
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          }
          description="Each category has its own technicians, service modes, and starting prices. Start with the device, then compare the people behind it."
          title="What we repair."
        />

        <ul className="mt-10 divide-y divide-line border-y border-line">
          {SERVICE_CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICONS[category]
            return (
              <li key={category}>
                <Link
                  className="group flex items-start gap-4 py-5 transition-colors hover:bg-sage/20 sm:items-center"
                  href={`/services?category=${encodeURIComponent(category)}`}
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-[0.625rem] bg-sage text-spruce">
                    <Icon aria-hidden className="size-5" strokeWidth={1.9} />
                  </span>
                  <div className="min-w-0 flex-1 sm:grid sm:grid-cols-[11rem_1fr] sm:items-center sm:gap-4">
                    <span className="text-sm font-semibold text-ink sm:text-base">
                      {category}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-muted-ink sm:mt-0">
                      {categoryDescriptions[category]}
                    </span>
                  </div>
                  <ArrowUpRight
                    aria-hidden
                    className="mt-1 size-4 shrink-0 text-muted-ink transition-transform group-hover:-translate-y-0.5 group-hover:text-spruce sm:mt-0"
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
