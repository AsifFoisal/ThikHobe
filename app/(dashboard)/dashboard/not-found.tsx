import { SearchX } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { EmptyState } from "@/components/ui/state"

export default function DashboardNotFound() {
  return (
    <>
      <h1 className="sr-only">Dashboard page not found</h1>
      <Card className="mx-auto max-w-xl">
        <EmptyState
          action={
            <Link
              className={buttonVariants({ size: "sm" })}
              href="/dashboard"
            >
              Back to dashboard
            </Link>
          }
          description="The workspace page you requested doesn't exist. Return to your dashboard to continue."
          icon={SearchX}
          title="Page not found"
        />
      </Card>
    </>
  )
}
