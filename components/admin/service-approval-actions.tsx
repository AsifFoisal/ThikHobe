import { ConfirmDialog } from "@/components/dashboard/confirm-dialog"
import type { Service } from "@/types"

export function ServiceApprovalActions({ service }: { service: Service }) {
  if (service.approvalStatus !== "pending") return null

  return (
    <div className="flex justify-end gap-2">
      <ConfirmDialog
        cancelLabel="Keep pending"
        confirmLabel="Approve service"
        description="Preview only — this service will stay pending. In a connected build, approval would publish it to the marketplace."
        destructive={false}
        title="Approve this service?"
        triggerLabel="Approve"
        triggerVariant="default"
      />
      <ConfirmDialog
        cancelLabel="Keep pending"
        confirmLabel="Reject service"
        description="Preview only — this service will stay pending. In a connected build, rejection would prevent it from being published."
        title="Reject this service?"
        triggerLabel="Reject"
        triggerVariant="destructive"
      />
    </div>
  )
}
