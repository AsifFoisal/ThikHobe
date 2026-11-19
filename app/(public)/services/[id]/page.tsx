import type { Metadata } from "next"
import { House, Store } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { ServiceSummaryCard } from "@/components/services/ServiceSummaryCard"
import { TechnicianCard } from "@/components/services/TechnicianCard"
import { Badge } from "@/components/ui/Badge"
import { getServiceById } from "@/lib/server-data"
import { getSessionProfile, ServerApiError } from "@/lib/server-api"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params

  try {
    const service = await getServiceById(id)
    return {
      title: service.title,
      description: service.description,
      openGraph: {
        title: service.title,
        description: service.description,
        images: [{ url: service.image, alt: service.title }],
      },
    }
  } catch {
    return { title: "Service not found" }
  }
}

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  let service
  try {
    service = await getServiceById(id)
  } catch (error) {
    if (error instanceof ServerApiError && error.status === 404) notFound()
    throw error
  }

  const viewer = await getSessionProfile()
  const ModeIcon = service.mode === "Home Visit" ? House : Store

  return (
    <div className="container-page pt-8 pb-16 lg:pt-10">
      <nav aria-label="Breadcrumb" className="text-xs text-muted-ink">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link className="transition-colors hover:text-spruce" href="/">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link
              className="transition-colors hover:text-spruce"
              href="/services"
            >
              Services
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li
            aria-current="page"
            className="max-w-[12rem] truncate text-ink sm:max-w-sm"
          >
            {service.title}
          </li>
        </ol>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-14">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="neutral">{service.category}</Badge>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-ink">
              <ModeIcon aria-hidden className="size-3.5" />
              {service.mode}
            </span>
            <span className="text-xs text-muted-ink">· {service.area}</span>
          </div>

          <h1 className="type-h1 mt-4">{service.title}</h1>
          <p className="type-lead mt-4 max-w-[60ch]">{service.description}</p>

          <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl bg-sage">
            <Image
              alt={`${service.title} by ${service.technician.name}`}
              className="object-cover"
              fill
              loading="eager"
              sizes="(min-width: 1024px) 680px, 100vw"
              src={service.image}
            />
          </div>

          <TechnicianCard technician={service.technician} />
        </div>

        <aside className="lg:self-stretch">
          <div className="lg:sticky lg:top-24">
            <ServiceSummaryCard service={service} viewer={viewer} />
          </div>
        </aside>
      </div>
    </div>
  )
}
