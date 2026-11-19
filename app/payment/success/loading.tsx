import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function PaymentSuccessLoading() {
  return (
    <div aria-busy="true" className="w-full max-w-2xl">
      <h1 className="sr-only">Verifying payment</h1>
      <Card className="p-6 sm:p-8">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="mt-5 h-10 w-64 max-w-full" />
        <Skeleton className="mt-3 h-5 w-full max-w-md" />
        <Skeleton className="mt-2 h-5 w-4/5 max-w-sm" />
        <Skeleton className="mt-4 h-5 w-32 rounded-full" />
        <div className="mt-6 space-y-3 border-y border-line py-4">
          {Array.from({ length: 5 }, (_, index) => (
            <div className="flex items-center justify-between gap-4" key={index}>
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-36" />
            </div>
          ))}
        </div>
        <div className="mt-6 flex gap-2">
          <Skeleton className="h-10 w-44" />
          <Skeleton className="h-10 w-32" />
        </div>
        <span aria-live="polite" className="sr-only">
          Verifying the Stripe checkout session. No success is shown before
          verification.
        </span>
      </Card>
    </div>
  )
}
