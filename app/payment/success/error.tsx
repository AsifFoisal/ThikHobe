"use client"

import { RotateCcw } from "lucide-react"
import Link from "next/link"

import { Button, buttonVariants } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { ErrorState } from "@/components/ui/State"

export default function PaymentSuccessError({
  reset,
}: {
  reset: () => void
}) {
  return (
    <>
      <h1 className="sr-only">Payment verification error</h1>
      <Card className="w-full max-w-2xl">
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
                href="/"
              >
                Return Home
              </Link>
            </div>
          }
          description="The payment page hit an unexpected error and no success result is shown. Try again, or return home."
          title="We couldn't load this payment"
        />
      </Card>
    </>
  )
}
