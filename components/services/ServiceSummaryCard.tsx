import { Clock3, House, MapPin, Store, Wallet } from "lucide-react"
import Link from "next/link"

import { RequestRepairDialog } from "@/components/bookings/RequestRepairDialog"
import { buttonVariants } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { formatPrice } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Service, SessionUser } from "@/types"

export function ServiceSummaryCard({
  service,
  viewer,
}: {
  service: Service
  viewer: SessionUser | null
}) {
  const ModeIcon = service.mode === "Home Visit" ? House : Store
  const isCustomer = viewer?.role === "customer"
  const signInHref = `/sign-in?redirect=${encodeURIComponent(
    `/services/${service.id}`
  )}`

  return (
    <Card className="p-6">
      <p className="text-[0.6875rem] font-semibold tracking-[0.12em] text-muted-ink uppercase">
        Starting from
      </p>
      <p className="tabular mt-1 text-4xl font-bold tracking-[-0.035em] text-ink">
        {formatPrice(service.basePrice)}
      </p>
      <p className="mt-2 text-xs leading-5 text-muted-ink">
        The final amount is confirmed by the technician after inspecting the
        repair.
      </p>

      <dl className="mt-6 space-y-3 border-t border-line pt-5">
        <div className="flex items-center justify-between gap-4 text-sm">
          <dt className="inline-flex items-center gap-2 text-muted-ink">
            <Clock3 aria-hidden className="size-4" />
            Estimated duration
          </dt>
          <dd className="text-right font-medium text-ink">
            {service.estimatedDuration}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm">
          <dt className="inline-flex items-center gap-2 text-muted-ink">
            <ModeIcon aria-hidden className="size-4" />
            Service mode
          </dt>
          <dd className="text-right font-medium text-ink">{service.mode}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm">
          <dt className="inline-flex items-center gap-2 text-muted-ink">
            <MapPin aria-hidden className="size-4" />
            Service area
          </dt>
          <dd className="text-right font-medium text-ink">{service.area}</dd>
        </div>
      </dl>

      <div className="mt-6">
        {viewer?.role === "customer" ? (
          <RequestRepairDialog
            serviceId={service.id}
            serviceTitle={service.title}
            viewer={viewer}
          />
        ) : viewer ? (
          <span
            aria-disabled="true"
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-full cursor-not-allowed opacity-50"
            )}
          >
            Customers only
          </span>
        ) : (
          <Link
            className={cn(buttonVariants({ size: "lg" }), "w-full")}
            href={signInHref}
          >
            Sign in to request
          </Link>
        )}
      </div>

      <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-muted-ink">
        {isCustomer ? (
          <>
            <Wallet aria-hidden className="mt-0.5 size-3.5 shrink-0" />
            <span>
              No upfront payment — pay only after the repair is complete.
            </span>
          </>
        ) : viewer ? (
          <span>
            Technician and admin accounts cannot send repair requests.
          </span>
        ) : (
          <span>You&apos;ll return to this service after signing in.</span>
        )}
      </p>
    </Card>
  )
}
