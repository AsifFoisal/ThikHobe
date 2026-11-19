import {
  ClipboardList,
  Search,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/Button"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { cn } from "@/lib/utils"

const steps: {
  title: string
  description: string
  icon: LucideIcon
}[] = [
  {
    title: "Find a service",
    description:
      "Compare verified repair services by device, area, price, and whether the technician comes to you or you drop off.",
    icon: Search,
  },
  {
    title: "Send a repair request",
    description:
      "Choose a preferred date and describe the problem. The request goes straight to the technician who will do the work.",
    icon: ClipboardList,
  },
  {
    title: "Technician fixes it",
    description:
      "Requested, accepted, in progress, completed: follow each update in one place instead of chasing phone calls.",
    icon: Wrench,
  },
  {
    title: "Pay after completion",
    description:
      "No upfront charge. Review the final amount and pay online only after the repair is complete.",
    icon: Wallet,
  },
]

export function HowItWorks() {
  return (
    <section
      className="scroll-mt-24 bg-spruce py-16 text-paper sm:py-20 lg:py-24"
      id="how-it-works"
    >
      <div className="container-page">
        <SectionHeading
          description="No mystery fees, no chasing updates. Here is exactly what happens from the moment you find a service to the moment you pay."
          title="From request to repair, in four clear steps."
          tone="dark"
        />

        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <li
                className="relative border-t border-white/15 pt-7"
                key={step.title}
              >
                <span
                  aria-hidden
                  className="absolute -top-3 left-0 grid size-6 place-items-center rounded-full bg-spruce text-[0.625rem] font-semibold text-sage ring-1 ring-white/20"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon
                  aria-hidden
                  className="size-5 text-ember"
                  strokeWidth={1.9}
                />
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.015em] text-paper">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-sage">
                  {step.description}
                </p>
              </li>
            )
          })}
        </ol>

        <div className="mt-12 flex flex-col gap-5 rounded-xl border border-white/15 bg-white/5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ember text-ink">
              <Wallet aria-hidden className="size-5" />
            </span>
            <div>
              <p className="font-semibold text-paper">
                Nothing to pay until it&apos;s fixed.
              </p>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-sage">
                The final amount is confirmed when the technician completes the
                job. Payment unlocks after completion—not before.
              </p>
            </div>
          </div>
          <Link
            className={cn(buttonVariants({ variant: "secondary" }), "shrink-0")}
            href="/services"
          >
            Find a repair
          </Link>
        </div>
      </div>
    </section>
  )
}
