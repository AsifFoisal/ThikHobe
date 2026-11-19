"use client"

import { Dialog } from "@base-ui/react/dialog"

import { buttonVariants } from "@/components/ui/button"
import { previewToast } from "@/lib/preview-toast"
import { cn } from "@/lib/utils"

interface ConfirmDialogProps {
  triggerLabel: string
  triggerVariant?: "default" | "outline" | "destructive"
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
  onConfirm?: () => void
}

export function ConfirmDialog({
  triggerLabel,
  triggerVariant = "outline",
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = true,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className={cn(buttonVariants({ size: "sm", variant: triggerVariant }))}
      >
        {triggerLabel}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[60] bg-ink/50 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-[60] w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-line bg-card p-6 text-ink shadow-lift transition-[scale,opacity] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0">
          <Dialog.Title className="type-h3">{title}</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm leading-6 text-muted-ink">
            {description}
          </Dialog.Description>
          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <Dialog.Close
              className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
            >
              {cancelLabel}
            </Dialog.Close>
            <Dialog.Close
              className={cn(
                buttonVariants({ size: "sm" }),
                destructive &&
                  "bg-destructive text-white hover:bg-destructive/90"
              )}
              onClick={() => {
                onConfirm?.()
                previewToast()
              }}
            >
              {confirmLabel}
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
