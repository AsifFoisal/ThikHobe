"use client"

import { Dialog } from "@base-ui/react/dialog"
import { CreditCard } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"

interface PayNowDialogProps {
  amount: number
  size?: "sm" | "default"
}

export function PayNowDialog({ amount, size = "sm" }: PayNowDialogProps) {
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
          <Dialog.Title className="type-h3 mt-4">Checkout preview</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm leading-6 text-muted-ink">
            Stripe Checkout is not connected in this frontend prototype. No card
            details are collected and no payment will be taken.
          </Dialog.Description>
          <div className="mt-4 rounded-lg border border-line bg-paper p-3">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-muted-ink">Amount due</span>
              <span className="font-semibold text-ink tabular">
                {formatPrice(amount)}
              </span>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Dialog.Close className={buttonVariants({ size: "sm" })}>
              Close
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
