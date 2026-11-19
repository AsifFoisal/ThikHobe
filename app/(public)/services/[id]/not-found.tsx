import { Wrench } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/Button"

export default function ServiceNotFound() {
  return (
    <div className="container-page flex min-h-[60vh] items-center justify-center py-16">
      <div className="max-w-lg text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-sage text-spruce">
          <Wrench aria-hidden className="size-7" strokeWidth={1.8} />
        </span>
        <h1 className="type-h2 mt-6">This service isn&apos;t available.</h1>
        <p className="mt-3 text-sm leading-6 text-muted-ink">
          It may have been removed, is waiting for approval, or is no longer
          accepting requests. Browse the current services to find another
          option.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link className={buttonVariants()} href="/services">
            Browse services
          </Link>
          <Link className={buttonVariants({ variant: "outline" })} href="/">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
