"use client"

import { RotateCcw } from "lucide-react"
import Link from "next/link"

import { Button, buttonVariants } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { ErrorState } from "@/components/ui/State"

export default function CustomerPaymentsError({
  reset,
}: {
  reset: () => void
}) {
  return (
    <>
      <h1 className="sr-only">Payment history error</h1>
      <Card className="mx-auto max-w-xl">
        <ErrorState
          action={
            <div className="flex flex-wrap justify-center gap-2">
              <Button onClick={reset} size="sm">
                <RotateCcw aria-hidden className="size-4" />
                Try again
              </Button>
              <Link
                className={buttonVariants({
                  size: "sm",
                  variant: "outline",
                })}
                href="/dashboard/customer"
              >
                Back to overview
              </Link>
            </div>
          }
          description="The payment records could not be displayed. Try again, or return to the customer overview."
          title="Payments couldn't load"
        />
      </Card>
    </>
  )
}
