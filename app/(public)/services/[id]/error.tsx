"use client"

import Link from "next/link"

import { Button, buttonVariants } from "@/components/ui/Button"
import { ErrorState } from "@/components/ui/State"

export default function ServiceDetailsError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container-page py-16">
      <ErrorState
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={reset}>Try again</Button>
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/services"
            >
              Browse services
            </Link>
          </div>
        }
        description="Something went wrong while loading this service. Try again, or browse the other available repair services."
        title="We couldn't load this service"
      />
    </div>
  )
}
