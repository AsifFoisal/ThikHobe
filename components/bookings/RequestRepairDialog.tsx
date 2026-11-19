"use client"

import { Dialog } from "@base-ui/react/dialog"
import { ArrowRight, X } from "lucide-react"

import { RepairRequestForm } from "@/components/bookings/RepairRequestForm"
import { buttonVariants } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import type { SessionUser } from "@/types"

export function RequestRepairDialog({
  serviceId,
  serviceTitle,
  viewer,
}: {
  serviceId: string
  serviceTitle: string
  viewer: SessionUser
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={cn(buttonVariants({ size: "lg" }), "w-full")}>
        Request repair
        <ArrowRight aria-hidden />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[60] min-h-dvh bg-ink/55 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-[60] max-h-[90vh] w-[calc(100vw-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-line bg-card text-ink shadow-lift transition-[scale,opacity] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0">
          <div className="sticky top-0 z-10 rounded-t-2xl border-b border-line bg-card px-5 pt-5 pb-4 sm:px-7 sm:pt-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Dialog.Title className="type-h2">
                  Request a repair
                </Dialog.Title>
                <Dialog.Description className="mt-2 max-w-[55ch] text-sm leading-6 text-muted-ink">
                  Share the contact and access details for {serviceTitle}. The
                  technician reviews the request before accepting.
                </Dialog.Description>
              </div>
              <Dialog.Close
                aria-label="Close request form"
                className="grid size-9 shrink-0 place-items-center rounded-[0.625rem] border border-line bg-card text-muted-ink transition-colors hover:bg-sage/60 hover:text-spruce focus-visible:ring-2 focus-visible:ring-fern focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                <X aria-hidden className="size-4" />
              </Dialog.Close>
            </div>
          </div>

          <div className="px-5 pb-5 sm:px-7 sm:pb-7">
            <RepairRequestForm serviceId={serviceId} viewer={viewer} />
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
