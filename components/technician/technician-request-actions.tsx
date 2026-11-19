"use client"

import { Dialog } from "@base-ui/react/dialog"
import { useState } from "react"

import { Button, buttonVariants } from "@/components/ui/button"
import { previewToast } from "@/lib/preview-toast"
import { cn } from "@/lib/utils"
import { formatPrice } from "@/lib/format"
import type { Booking } from "@/types"

type RequestAction = "accept" | "reject" | "start" | "complete"

const dialogCopy: Record<
  Exclude<RequestAction, "complete">,
  { title: string; description: string; confirm: string; destructive?: boolean }
> = {
  accept: {
    title: "Accept this request?",
    description:
      "Preview only — accepting would assign this repair to you. No booking changes and no customer notification is sent in this prototype.",
    confirm: "Accept request",
  },
  reject: {
    title: "Reject this request?",
    description:
      "Preview only — rejecting would close the request. No records change in this prototype.",
    confirm: "Reject request",
    destructive: true,
  },
  start: {
    title: "Start this repair?",
    description:
      "Preview only — the booking would move to In Progress. No status is changed here.",
    confirm: "Start work",
  },
}

export function TechnicianRequestActions({ booking }: { booking: Booking }) {
  const [open, setOpen] = useState(false)
  const [action, setAction] = useState<RequestAction | null>(null)
  const [finalAmount, setFinalAmount] = useState("")
  const [amountError, setAmountError] = useState("")
  const [previewed, setPreviewed] = useState(false)

  const openAction = (nextAction: RequestAction) => {
    setAction(nextAction)
    setFinalAmount(booking.finalAmount ? String(booking.finalAmount) : "")
    setAmountError("")
    setPreviewed(false)
    setOpen(true)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) {
      setAction(null)
      setPreviewed(false)
      setAmountError("")
    }
  }

  const handleComplete = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const amount = Number(finalAmount)

    if (!finalAmount.trim() || Number.isNaN(amount) || amount <= 0) {
      setAmountError("Enter an amount greater than zero.")
      return
    }

    setAmountError("")
    setPreviewed(true)
  }

  if (
    !["requested", "accepted", "in_progress"].includes(booking.status)
  ) {
    return null
  }

  const copy =
    action && action !== "complete" ? dialogCopy[action] : null
  const isComplete = action === "complete"

  return (
    <Dialog.Root onOpenChange={handleOpenChange} open={open}>
      <div className="flex flex-wrap gap-2">
        {booking.status === "requested" ? (
          <>
            <Button onClick={() => openAction("accept")} size="sm">
              Accept
            </Button>
            <Button
              onClick={() => openAction("reject")}
              size="sm"
              variant="destructive"
            >
              Reject
            </Button>
          </>
        ) : null}
        {booking.status === "accepted" ? (
          <Button onClick={() => openAction("start")} size="sm">
            Start work
          </Button>
        ) : null}
        {booking.status === "in_progress" ? (
          <Button onClick={() => openAction("complete")} size="sm">
            Mark completed
          </Button>
        ) : null}
      </div>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[60] bg-ink/50 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-[60] max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-line bg-card p-6 text-ink shadow-lift transition-[scale,opacity] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0">
          {isComplete ? (
            <>
              <Dialog.Title className="type-h3">
                Mark this job completed
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm leading-6 text-muted-ink">
                Enter the final amount for this repair. This prototype
                validates the amount but does not save a status or payment.
              </Dialog.Description>

              <form className="mt-5" noValidate onSubmit={handleComplete}>
                <div className="rounded-lg bg-paper p-3">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-muted-ink">Base price</span>
                    <span className="font-semibold text-ink tabular">
                      {formatPrice(booking.basePrice)}
                    </span>
                  </div>
                </div>

                <label
                  className="mt-4 block text-[0.8125rem] font-medium text-ink"
                  htmlFor={`final-amount-${booking.id}`}
                >
                  Final amount (BDT)
                  <span aria-hidden className="text-fern">
                    {" "}
                    *
                  </span>
                </label>
                <input
                  aria-describedby={
                    amountError
                      ? `final-amount-${booking.id}-error`
                      : `final-amount-${booking.id}-hint`
                  }
                  aria-invalid={Boolean(amountError)}
                  className={cn(
                    "mt-1.5 h-11 w-full rounded-[0.625rem] border border-line-strong bg-paper px-3 text-sm text-ink transition-colors placeholder:text-muted-ink focus-visible:border-fern focus-visible:ring-2 focus-visible:ring-fern/20 focus-visible:outline-none tabular",
                    amountError && "border-destructive"
                  )}
                  id={`final-amount-${booking.id}`}
                  inputMode="decimal"
                  min="1"
                  onChange={(event) => {
                    setFinalAmount(event.target.value)
                    setAmountError("")
                    setPreviewed(false)
                  }}
                  placeholder="Enter the agreed final amount"
                  required
                  step="1"
                  type="number"
                  value={finalAmount}
                />
                {amountError ? (
                  <p
                    className="mt-1.5 text-xs font-medium text-status-red"
                    id={`final-amount-${booking.id}-error`}
                  >
                    {amountError}
                  </p>
                ) : (
                  <p
                    className="mt-1.5 text-xs text-muted-ink"
                    id={`final-amount-${booking.id}-hint`}
                  >
                    Must be greater than zero. The final amount can differ from
                    the base price.
                  </p>
                )}

                {previewed ? (
                  <div
                    className="mt-4 rounded-lg border border-line bg-sage/50 px-4 py-3 text-sm leading-6 text-spruce"
                    role="status"
                  >
                    <strong className="font-semibold">
                      Validated locally.
                    </strong>{" "}
                    No status or final amount was saved. A connected build would
                    submit the new completion and amount to the backend.
                  </div>
                ) : null}

                <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-line pt-4">
                  <Dialog.Close
                    className={buttonVariants({
                      size: "sm",
                      variant: "outline",
                    })}
                  >
                    Cancel
                  </Dialog.Close>
                  <Button disabled={previewed} size="sm" type="submit">
                    Save completion
                  </Button>
                </div>
              </form>
            </>
          ) : copy ? (
            <>
              <Dialog.Title className="type-h3">{copy.title}</Dialog.Title>
              <Dialog.Description className="mt-2 text-sm leading-6 text-muted-ink">
                {copy.description}
              </Dialog.Description>
              <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-line pt-4">
                <Dialog.Close
                  className={buttonVariants({
                    size: "sm",
                    variant: "outline",
                  })}
                >
                  Keep request
                </Dialog.Close>
                <Dialog.Close
                  className={buttonVariants({
                    size: "sm",
                    variant: copy.destructive ? "destructive" : "default",
                  })}
                  onClick={() =>
                    previewToast("The request status is unchanged.")
                  }
                >
                  {copy.confirm}
                </Dialog.Close>
              </div>
            </>
          ) : null}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
