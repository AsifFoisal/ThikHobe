import { CalendarCheck, ShieldCheck, Wallet } from "lucide-react"
import Link from "next/link"

import { RepairRequestForm } from "@/components/bookings/repair-request-form"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ROLE_LABELS } from "@/constants"
import type { SampleService } from "@/data/sample-services"
import { cn } from "@/lib/utils"
import type { SessionUser } from "@/types"

function SignInPrompt({ serviceId }: { serviceId: string }) {
  const signInHref = `/sign-in?redirect=${encodeURIComponent(
    `/services/${serviceId}#request-repair`
  )}`

  return (
    <Card className="max-w-2xl p-6 sm:p-8">
      <h2 className="type-h2">Sign in to request this repair</h2>
      <p className="mt-3 max-w-[55ch] text-sm leading-6 text-muted-ink">
        You need a customer account to send a repair request. After signing in,
        you&apos;ll return to this service and can complete the request here.
      </p>
      <Link
        className={cn(buttonVariants({ size: "lg" }), "mt-6")}
        href={signInHref}
      >
        Sign in to continue
      </Link>
    </Card>
  )
}

function StaffNotice({ viewer }: { viewer: SessionUser }) {
  return (
    <Card className="max-w-2xl p-6 sm:p-8">
      <h2 className="type-h2">Repair requests are for customers</h2>
      <p className="mt-3 max-w-[55ch] text-sm leading-6 text-muted-ink">
        You&apos;re signed in as a {ROLE_LABELS[viewer.role]}. Technician and
        admin accounts can browse services, but only customers can send repair
        requests for them.
      </p>
      <Link
        className={cn(
          buttonVariants({ size: "lg", variant: "outline" }),
          "mt-6"
        )}
        href="/services"
      >
        Browse other services
      </Link>
    </Card>
  )
}

export function RepairRequestSection({
  service,
  viewer,
}: {
  service: SampleService
  viewer: SessionUser | null
}) {
  if (!viewer) {
    return (
      <section className="mt-14 scroll-mt-24" id="request-repair">
        <SignInPrompt serviceId={service.id} />
      </section>
    )
  }

  if (viewer.role !== "customer") {
    return (
      <section className="mt-14 scroll-mt-24" id="request-repair">
        <StaffNotice viewer={viewer} />
      </section>
    )
  }

  return (
    <section className="mt-14 scroll-mt-24" id="request-repair">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <Card className="p-5 sm:p-7">
          <h2 className="type-h2">Send a repair request</h2>
          <p className="mt-3 max-w-[60ch] text-sm leading-6 text-muted-ink">
            Share the contact and access details. The technician reviews the
            request before accepting the job.
          </p>
          <RepairRequestForm viewer={viewer} />
        </Card>

        <Card className="bg-sage/40 p-6">
          <h3 className="type-h3">What happens next</h3>
          <ol className="mt-4 space-y-3 text-sm leading-6 text-muted-ink">
            <li>
              <span className="font-semibold text-ink">1. Review.</span> The
              technician checks the request and confirms the visit.
            </li>
            <li>
              <span className="font-semibold text-ink">2. Repair.</span> Follow
              the status from accepted to completed in your bookings.
            </li>
            <li>
              <span className="font-semibold text-ink">3. Pay.</span> The final
              amount is confirmed, then paid after the work is complete.
            </li>
          </ol>
          <div className="mt-5 flex items-start gap-2 border-t border-line pt-4 text-xs leading-5 text-muted-ink">
            <Wallet aria-hidden className="mt-0.5 size-3.5 shrink-0" />
            <span>No upfront payment is collected with this request.</span>
          </div>
          <div className="mt-2 flex items-start gap-2 text-xs leading-5 text-muted-ink">
            <ShieldCheck aria-hidden className="mt-0.5 size-3.5 shrink-0" />
            <span>Your details are only used to coordinate this repair.</span>
          </div>
          <div className="mt-2 flex items-start gap-2 text-xs leading-5 text-muted-ink">
            <CalendarCheck aria-hidden className="mt-0.5 size-3.5 shrink-0" />
            <span>
              The technician confirms the preferred date before visiting.
            </span>
          </div>
        </Card>
      </div>
    </section>
  )
}
