import {
  ArrowUpRight,
  House,
  MapPin,
  ShieldCheck,
  Store,
  Tag,
} from "lucide-react"
import Link from "next/link"

import { ServiceCardImage } from "@/components/services/ServiceCardImage"
import { Avatar } from "@/components/ui/Avatar"
import { buttonVariants } from "@/components/ui/Button"
import { formatPrice } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Service, ServiceCategory } from "@/types"

const FALLBACK_IMAGES: Record<ServiceCategory, string> = {
  Smartphone: "https://i.ibb.co/LdjsQMCM/71920d00fc19.jpg",
  "Laptop & PC": "https://i.ibb.co/SwLSgc3s/37259923e039.jpg",
  AC: "https://i.ibb.co/v66CR9CF/bb2cc34204e9.jpg",
  Refrigerator: "https://i.ibb.co/5X7xQx11/100f40d96407.jpg",
  TV: "https://i.ibb.co/27XDhbWd/b3a45b7b8f7e.jpg",
  "Washing Machine": "https://i.ibb.co/VWM1wmVN/61c8e9ee1870.jpg",
  Electrical: "https://i.ibb.co/Z4yfft0/1f8b228796b0.jpg",
}

interface ServiceCardProps {
  service: Service
  priority?: boolean
}

export function ServiceCard({ service, priority = false }: ServiceCardProps) {
  const ModeIcon = service.mode === "Home Visit" ? House : Store
  const serviceHref = `/services/${service.id}`

  return (
    <article className="flex h-full flex-col rounded-xl border border-line bg-card p-2 transition-[border-color,transform] duration-200 ease-out hover:-translate-y-1 hover:border-spruce/25">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-sage">
        <ServiceCardImage
          alt={`${service.title} by ${service.technician.name}`}
          fallbackSrc={FALLBACK_IMAGES[service.category]}
          priority={priority}
          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 92vw"
          src={service.image}
        />
      </div>

      <div className="flex flex-1 flex-col px-2.5 pt-4 pb-2">
        <h3 className="type-h3 line-clamp-2 min-h-[2.7rem] text-[1.0625rem] leading-snug">
          <Link
            className="transition-colors hover:text-spruce"
            href={serviceHref}
          >
            {service.title}
          </Link>
        </h3>
        <p className="mt-1 text-xs font-medium text-muted-ink">
          {service.category}
        </p>

        <div className="mt-3 flex min-w-0 items-center gap-2 text-xs text-muted-ink">
          <Avatar
            className="size-6 text-[0.625rem]"
            name={service.technician.name}
            size="sm"
            src={service.technician.image}
          />
          <span className="min-w-0 truncate font-medium text-ink">
            {service.technician.name}
          </span>
          <span
            aria-hidden
            className="size-1 shrink-0 rounded-full bg-line-strong"
          />
          <span className="inline-flex min-w-0 items-center gap-1">
            <MapPin aria-hidden className="size-3.5 shrink-0" />
            <span className="truncate">{service.area}</span>
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
          <span className="inline-flex items-center gap-1.5">
            <Tag aria-hidden className="size-3.5 text-muted-ink" />
            <span className="text-muted-ink">From</span>
            <span className="tabular font-semibold text-ink">
              {formatPrice(service.basePrice)}
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-muted-ink">
            <ModeIcon aria-hidden className="size-3.5 shrink-0" />
            {service.mode}
          </span>
        </div>

        <div className="mt-auto flex items-center gap-2 pt-4">
          <Link
            aria-label={`View details for ${service.title}`}
            className={cn(buttonVariants(), "flex-1")}
            href={serviceHref}
          >
            View details
            <ArrowUpRight aria-hidden />
          </Link>
          <span
            aria-label="Verified technician"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-sage text-spruce"
            role="img"
            title="Verified technician"
          >
            <ShieldCheck aria-hidden className="size-4" />
          </span>
        </div>
      </div>
    </article>
  )
}
