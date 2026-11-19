import type { Metadata } from "next"
import { Plus, Wrench } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { ConfirmDialog } from "@/components/dashboard/confirm-dialog"
import { DataTable } from "@/components/dashboard/data-table"
import { AvailabilityToggle } from "@/components/technician/availability-toggle"
import { EditServiceDialog } from "@/components/technician/edit-service-dialog"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ApprovalStatusBadge } from "@/components/ui/status-badge"
import { EmptyState } from "@/components/ui/state"
import { SAMPLE_TECHNICIAN_SERVICES } from "@/data/sample-technician"
import { formatPrice } from "@/lib/format"
import type { Service } from "@/types"

export const metadata: Metadata = {
  title: "My services",
  description:
    "Sample service listings for the FixMate technician, including approval, availability, edit, and delete previews.",
}

function serviceDisabledReason(service: Service) {
  if (service.approvalStatus === "pending") return "After approval"
  if (service.approvalStatus === "rejected") return "Not published"
  return undefined
}

export default function TechnicianServicesPage() {
  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <h1 className="type-h1">My services</h1>
          <p className="type-lead mt-3">
            Manage your listings, availability, and the details customers see
            before booking.
          </p>
          <p className="type-meta mt-2">
            Preview workspace · sample services. Edit, delete, and availability
            controls do not change records.
          </p>
        </div>
        <Link
          className={buttonVariants({ size: "sm" })}
          href="/dashboard/technician/add-service"
        >
          <Plus aria-hidden className="size-4" />
          Add service
        </Link>
      </div>

      {SAMPLE_TECHNICIAN_SERVICES.length === 0 ? (
        <Card>
          <EmptyState
            action={
              <Link
                className={buttonVariants({ size: "sm" })}
                href="/dashboard/technician/add-service"
              >
                Add your first service
              </Link>
            }
            description="New listings will appear here after you add them."
            icon={Wrench}
            title="No services yet"
          />
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between gap-4 border-b border-line p-5">
            <div>
              <h2 className="type-h3">Your services</h2>
              <p className="mt-1 text-sm text-muted-ink">
                Approved listings can be toggled; pending and rejected listings
                stay locked.
              </p>
            </div>
            <Badge tone="neutral">
              {SAMPLE_TECHNICIAN_SERVICES.length} services
            </Badge>
          </div>

          <div className="p-4">
            <DataTable
              caption="Services belonging to the demo technician"
              tableFrom="xl"
              columns={[
                {
                  key: "service",
                  header: "Service",
                  cell: (service) => (
                    <div className="flex items-center gap-3">
                      <span className="relative size-11 shrink-0 overflow-hidden rounded-[0.625rem] bg-sage">
                        <Image
                          alt=""
                          className="object-cover"
                          fill
                          sizes="44px"
                          src={service.image}
                        />
                      </span>
                      <div className="min-w-0">
                        <p className="font-medium text-ink">
                          {service.title}
                        </p>
                        <p className="mt-1 text-[11px] tracking-[0.06em] text-muted-ink uppercase tabular">
                          #{service.id}
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "category",
                  header: "Category",
                  cell: (service) => (
                    <span className="text-muted-ink">{service.category}</span>
                  ),
                },
                {
                  key: "price",
                  header: "Price",
                  cell: (service) => (
                    <span className="font-medium text-ink tabular">
                      {formatPrice(service.basePrice)}
                    </span>
                  ),
                },
                {
                  key: "approval",
                  header: "Approval",
                  cell: (service) => (
                    <ApprovalStatusBadge status={service.approvalStatus} />
                  ),
                },
                {
                  key: "availability",
                  header: "Availability",
                  cell: (service) => (
                    <AvailabilityToggle
                      disabled={service.approvalStatus !== "approved"}
                      disabledReason={serviceDisabledReason(service)}
                      initialAvailable={service.available}
                      serviceTitle={service.title}
                    />
                  ),
                },
                {
                  key: "actions",
                  header: "Actions",
                  className: "text-right",
                  cell: (service) => (
                    <div className="flex justify-end gap-2">
                      <EditServiceDialog service={service} />
                      <ConfirmDialog
                        cancelLabel="Keep service"
                        confirmLabel="Delete service"
                        description="Preview only — this service will not be deleted. In a connected build the listing would be removed after confirmation."
                        title="Delete this service?"
                        triggerLabel="Delete"
                        triggerVariant="destructive"
                      />
                    </div>
                  ),
                },
              ]}
              getRowKey={(service) => service.id}
              rows={SAMPLE_TECHNICIAN_SERVICES}
            />
          </div>
        </Card>
      )}
    </div>
  )
}
