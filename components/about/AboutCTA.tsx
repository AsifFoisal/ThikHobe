import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/Button"

export function AboutCta() {
  return (
    <section className="bg-sage/60 py-16 sm:py-20">
      <div className="container-page grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
        <div>
          <h2 className="type-h1 max-w-[14ch]">
            Start with the repair, not the payment.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-ink">
            Compare verified services, choose a time, and follow the job from
            request to completion. Payment waits until the work is done.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 lg:items-end">
          <Link className={buttonVariants({ size: "lg" })} href="/services">
            Browse services
            <ArrowRight aria-hidden />
          </Link>
          <p className="text-xs text-muted-ink">
            Browse without creating an account.
          </p>
        </div>
      </div>
    </section>
  )
}
