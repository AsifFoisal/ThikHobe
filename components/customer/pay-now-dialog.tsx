"use client"

import { Dialog } from "@base-ui/react/dialog"
import { CreditCard, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { buttonVariants } from "@/components/ui/button"
import { ApiError, paymentsApi } from "@/lib/api"
import { cn } from "@/lib/utils"

interface PayNowDialogProps {
  amount: number
  bookingId: string
  size?: "sm" | "default"
}

export function PayNowDialog({
  amount,
  bookingId,
  size = "sm",
}: PayNowDialogProps) {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const displayAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)

  const startCheckout = async () => {
    setPending(true)
    setError(null)

    try {
      const { url } = await paymentsApi.createCheckoutSession(bookingId)
      if (!url) throw new Error("Stripe did not return a checkout URL.")
      toast.success("Opening Stripe Checkout…")
      window.location.assign(url)
    } catch (cause) {
      const message =
        cause instanceof ApiError
          ? cause.message
          : "Could not start checkout. Please try again."
      setError(message)
      toast.error(message)
      setPending(false)
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className={buttonVariants({ size })}>
        Pay now
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[60] bg-ink/50 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-[60] w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-line bg-card p-6 text-ink shadow-lift transition-[scale,opacity] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0">
          <span className="grid size-11 place-items-center rounded-full bg-sage text-spruce">
            <CreditCard aria-hidden className="size-5" strokeWidth={1.8} />
          </span>
          <Dialog.Title className="type-h3 mt-4">
            Continue to secure checkout
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm leading-6 text-muted-ink">
            Stripe will collect the payment for this completed repair. The
            server reads the final amount from the booking before creating the
            checkout session.
          </Dialog.Description>
          <div className="mt-4 border-y border-line py-3">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-muted-ink">Booking</span>
              <span className="font-semibold text-ink tabular">
                #{bookingId}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3 text-sm">
              <span className="text-muted-ink">Amount on record (USD)</span>
              <span className="font-semibold text-ink tabular">
                {displayAmount}
              </span>
            </div>
            <p className="mt-2 text-xs leading-5 text-muted-ink">
              The displayed amount is informational. Stripe charges the server
              amount derived from the booking, in USD.
            </p>
          </div>

          {error ? (
            <p
              aria-live="polite"
              className="mt-3 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs leading-5 text-status-red"
              role="alert"
            >
              {error}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap justify-end gap-2">
            <Dialog.Close className={buttonVariants({ size: "sm", variant: "outline" })}>
              Cancel
            </Dialog.Close>
            <button
              className={cn(buttonVariants({ size: "sm" }))}
              disabled={pending}
              onClick={startCheckout}
              type="button"
            >
              {pending ? (
                <Loader2 aria-hidden className="size-4 animate-spin" />
              ) : null}
              {pending ? "Starting checkout…" : "Continue to Stripe"}
            </button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
