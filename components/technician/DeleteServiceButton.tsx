"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { ConfirmDialog } from "@/components/dashboard/ConfirmDialog"
import { ApiError, servicesApi } from "@/lib/api"

export function DeleteServiceButton({
  serviceId,
  serviceTitle,
}: {
  serviceId: string
  serviceTitle: string
}) {
  const router = useRouter()

  const remove = async () => {
    try {
      await servicesApi.delete(serviceId)
      toast.success("Service deleted")
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof ApiError
          ? error.message
          : "The service could not be deleted."
      )
    }
  }

  return (
    <ConfirmDialog
      cancelLabel="Keep service"
      confirmLabel="Delete service"
      description={`Delete “${serviceTitle}”? Existing bookings keep their own copy of the service information.`}
      onConfirm={remove}
      title="Delete this service?"
      triggerLabel="Delete"
      triggerVariant="destructive"
    />
  )
}
