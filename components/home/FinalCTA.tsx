import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/Button"

export function FinalCTA() {
  return (
    <section className="bg-spruce py-16 text-paper sm:py-20 lg:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
        <div>
          <h2 className="type-h1 max-w-[16ch] text-paper">
            A working device is one request away.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-sage">
            Choose a service, pick a time, and follow the repair from request to
            payment. You only pay when the job is done.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 lg:items-end">
          <Link
            className={buttonVariants({ size: "lg", variant: "accent" })}
            href="/services"
          >
            Browse services
            <ArrowRight aria-hidden />
          </Link>
          <p className="text-xs text-sage">
            Home visits and shop drop-offs across Bangladesh.
          </p>
        </div>
      </div>
    </section>
  )
}
