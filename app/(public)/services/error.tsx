"use client"

import Link from "next/link"

import { Button, buttonVariants } from "@/components/ui/Button"
import { ErrorState } from "@/components/ui/State"

export default function ServicesError({
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
            <Link className={buttonVariants({ variant: "outline" })} href="/">
              Back to home
            </Link>
          </div>
        }
        description="Something went wrong while loading the services page. Try again, or return home and come back."
        title="We couldn't load the services"
      />
    </div>
  )
}
