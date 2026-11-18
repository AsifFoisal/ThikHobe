import { ArrowUpRight, House, MapPin, Store } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Avatar } from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"
import type { Service } from "@/types"

interface ServiceCardProps {
  service: Service
  imagePosition?: string
  priority?: boolean
}

export function ServiceCard({
  service,
  imagePosition,
  priority = false,
}: ServiceCardProps) {
  const ModeIcon = service.mode === "Home Visit" ? House : Store
  const serviceHref = `/services/${service.id}`

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card transition-colors duration-300 hover:border-spruce/25">
      <div className="relative aspect-[4/3] overflow-hidden bg-sage">
        <Image
          alt={`${service.title} by ${service.technician.name}`}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          fill
          loading={priority ? "eager" : "lazy"}
          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 92vw"
          src={service.image}
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
        />
        <span className="absolute top-4 left-4 rounded-full bg-paper px-2.5 py-1 text-[0.6875rem] font-semibold text-spruce">
          {service.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-ink">
          <span className="inline-flex items-center gap-1.5">
            <MapPin aria-hidden className="size-3.5" />
            {service.area}
          </span>
          <span aria-hidden className="size-1 rounded-full bg-line-strong" />
          <span className="inline-flex items-center gap-1.5">
            <ModeIcon aria-hidden className="size-3.5" />
            {service.mode}
          </span>
        </div>

        <h3 className="type-h3 mt-3 line-clamp-2 min-h-[2.7rem] text-[1.0625rem] leading-snug">
          <Link
            className="transition-colors hover:text-spruce"
            href={serviceHref}
          >
            {service.title}
          </Link>
        </h3>

        <div className="mt-3 flex items-center gap-2 text-sm text-muted-ink">
          <Avatar
            className="size-6 text-[0.625rem]"
            name={service.technician.name}
            size="sm"
            src={service.technician.image}
          />
          <span className="truncate">{service.technician.name}</span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-4">
          <div>
            <p className="text-[0.6875rem] font-medium tracking-[0.12em] text-muted-ink uppercase">
              Starting from
            </p>
            <p className="tabular mt-0.5 text-xl font-semibold tracking-[-0.025em] text-ink">
              {formatPrice(service.basePrice)}
            </p>
          </div>
          <Link
            aria-label={`View details for ${service.title}`}
            className={buttonVariants({ size: "sm", variant: "outline" })}
            href={serviceHref}
          >
            View details
            <ArrowUpRight aria-hidden className="size-3.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}
