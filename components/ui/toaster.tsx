"use client"

import { Toaster as SonnerToaster } from "sonner"

export function Toaster() {
  return (
    <SonnerToaster
      closeButton
      gap={10}
      offset={24}
      position="bottom-right"
      theme="light"
      toastOptions={{
        duration: 4200,
        classNames: {
          toast:
            "!rounded-xl !border !border-line !bg-card !font-sans !text-ink !shadow-float",
          title: "!text-sm !font-semibold !text-ink",
          description: "!text-xs !text-muted-ink",
          actionButton: "!rounded-md !bg-spruce !font-semibold !text-paper",
          cancelButton: "!rounded-md !bg-sage !font-semibold !text-spruce",
          closeButton: "!border-line !bg-card !text-muted-ink",
          success: "[&_[data-icon]]:!text-fern",
          error: "[&_[data-icon]]:!text-destructive",
        },
      }}
    />
  )
}
