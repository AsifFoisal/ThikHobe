import { ArrowRight, Wrench } from "lucide-react"
import Link from "next/link"

import { ServiceCard } from "@/components/services/service-card"
import { buttonVariants } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/state"
import { SectionHeading } from "@/components/ui/section-heading"
import { getFeaturedServices } from "@/data/sample-services"

export function FeaturedServices() {
  const services = getFeaturedServices()

  return (
    <section className="section border-y border-line bg-card">
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
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          }
          description="Six recently listed services from verified technicians. Prices are starting points; your technician confirms the final amount before work begins."
          title="Repair services, ready when you are."
        />

        {services.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                imagePosition={service.imagePosition}
                key={service.id}
                service={service}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            action={
              <Link
                className={buttonVariants({ variant: "outline" })}
                href="/services"
              >
                Browse services
              </Link>
            }
            className="mt-8"
            description="Approved and available repair services will appear here as technicians list them."
            icon={Wrench}
            title="No services are listed yet"
          />
        )}
      </div>
    </section>
  )
}
