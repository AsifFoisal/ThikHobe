"use client"

import { RotateCcw } from "lucide-react"
import Link from "next/link"

import { Button, buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ErrorState } from "@/components/ui/state"

export default function DashboardError({ reset }: { reset: () => void }) {
  return (
    <>
      <h1 className="sr-only">Dashboard error</h1>
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
                href="/dashboard"
              >
                Back to dashboard
              </Link>
            </div>
          }
          description="This workspace could not be displayed. Try again, or return to the dashboard foundation."
          title="This workspace hit a problem"
        />
      </Card>
    </>
  )
}
