import { Badge } from "@/components/ui/badge"
import {
  APPROVAL_STATUS_META,
  BOOKING_STATUS_META,
  PAYMENT_STATUS_META,
} from "@/constants"
import type {
  BookingStatus,
  PaymentStatus,
  ServiceApprovalStatus,
} from "@/types"

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  const meta = BOOKING_STATUS_META[status]

  return (
    <Badge tone={meta.tone} dot>
      {meta.label}
    </Badge>
  )
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const meta = PAYMENT_STATUS_META[status]

  return (
    <Badge tone={meta.tone} dot>
      {meta.label}
    </Badge>
  )
}

export function ApprovalStatusBadge({
  status,
}: {
  status: ServiceApprovalStatus
}) {
  const meta = APPROVAL_STATUS_META[status]

  return (
    <Badge tone={meta.tone} dot>
      {meta.label}
    </Badge>
  )
}
