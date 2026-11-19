"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { ConfirmDialog } from "@/components/dashboard/ConfirmDialog"
import { ApiError, servicesApi } from "@/lib/api"
import type { Service } from "@/types"

// Approval controls are only exposed while a service is pending review.
export function ServiceApprovalActions({ service }: { service: Service }) {
  const router = useRouter()

  if (service.approvalStatus !== "pending") return null

  const review = async (approvalStatus: "approved" | "rejected") => {
    try {
      await servicesApi.approve(service.id, approvalStatus)
      toast.success(
        approvalStatus === "approved" ? "Service approved" : "Service rejected"
      )
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof ApiError
          ? error.message
          : "The service review could not be saved."
      )
    }
  }

  return (
    <div className="flex justify-end gap-2">
      <ConfirmDialog
        cancelLabel="Keep pending"
        confirmLabel="Approve service"
        description="Approving publishes this service to the public marketplace if it is available."
        destructive={false}
        onConfirm={() => review("approved")}
        title="Approve this service?"
        triggerLabel="Approve"
        triggerVariant="default"
      />
      <ConfirmDialog
        cancelLabel="Keep pending"
        confirmLabel="Reject service"
        description="Rejecting keeps this service out of the public marketplace."
        onConfirm={() => review("rejected")}
        title="Reject this service?"
        triggerLabel="Reject"
        triggerVariant="destructive"
      />
    </div>
  )
}
