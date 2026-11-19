import type { Metadata } from "next"
import {
  ChevronLeft,
  ClipboardCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

import { Card } from "@/components/ui/card"
import { AddServiceForm } from "@/components/technician/add-service-form"
import { requireSessionUser } from "@/lib/server-api"

export const metadata: Metadata = {
  title: "Add a service",
  description:
    "Create a repair service for administrator review.",
}

const approvalSteps = [
  {
    icon: ClipboardCheck,
    title: "Submit details",
    copy: "The service is created as pending and stays off the public marketplace.",
  },
  {
    icon: ShieldCheck,
    title: "Administrator review",
    copy: "An admin checks the description, pricing, category, and image.",
  },
  {
    icon: Sparkles,
    title: "Go live",
    copy: "Once approved and available, the service can appear in Browse Services.",
  },
]

export default async function AddServicePage() {
  const user = await requireSessionUser()

  return (
    <div className="space-y-6 lg:space-y-8">
      <div>
        <Link
          className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-muted-ink transition-colors hover:text-fern focus-visible:ring-2 focus-visible:ring-fern focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:outline-none"
          href="/dashboard/technician/my-services"
        >
          <ChevronLeft aria-hidden className="size-4" />
          My services
        </Link>
        <div className="mt-4 max-w-2xl">
          <h1 className="type-h1">Add a service</h1>
          <p className="type-lead mt-3">
            Turn your repair expertise into a clear, bookable service. Every new
            listing is reviewed before it goes live.
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr] xl:items-start">
        <Card className="p-5 sm:p-6 lg:p-8">
          <AddServiceForm technician={user} />
        </Card>

        <Card className="p-5 sm:p-6">
          <h2 className="type-h3">Approval flow</h2>
          <p className="mt-1 text-sm leading-6 text-muted-ink">
            Three steps keep the marketplace trustworthy.
          </p>
          <ol className="mt-5 space-y-5">
            {approvalSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <li className="flex gap-3" key={step.title}>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sage text-spruce">
                    <Icon aria-hidden className="size-4" strokeWidth={1.9} />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold tracking-[0.1em] text-muted-ink uppercase">
                        Step {index + 1}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm font-semibold text-ink">
                      {step.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-ink">
                      {step.copy}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
          <div className="mt-6 border-t border-line pt-4">
            <p className="text-xs leading-5 text-muted-ink">
              Editing a service later returns it to Pending approval.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
