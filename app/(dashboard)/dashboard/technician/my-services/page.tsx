import type { Metadata } from "next"
import { Plus, Wrench } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { DataTable } from "@/components/dashboard/DataTable"
import { AvailabilityToggle } from "@/components/technician/AvailabilityToggle"
import { DeleteServiceButton } from "@/components/technician/DeleteServiceButton"
import { EditServiceDialog } from "@/components/technician/EditServiceDialog"
import { Badge } from "@/components/ui/Badge"
import { buttonVariants } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { ApprovalStatusBadge } from "@/components/ui/StatusBadge"
import { EmptyState } from "@/components/ui/State"
import { formatPrice } from "@/lib/format"
import { getTechnicianServices } from "@/lib/server-data"
import type { Service } from "@/types"

export const metadata: Metadata = {
  title: "My services",
  description:
    "Your service listings, approval status, availability, and edit controls.",
}

function serviceDisabledReason(service: Service) {
  if (service.approvalStatus === "pending") return "After approval"
  if (service.approvalStatus === "rejected") return "Not published"
  return undefined
}

export default async function TechnicianServicesPage() {
  const services = await getTechnicianServices()

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <h1 className="type-h1">My services</h1>
          <p className="type-lead mt-3">
            Manage your listings, availability, and the details customers see
            before booking.
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

      {services.length === 0 ? (
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
            <Badge tone="neutral">{services.length} services</Badge>
          </div>

          <div className="p-4">
            <DataTable
              caption="Services belonging to your account"
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
                      serviceId={service.id}
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
                      <DeleteServiceButton
                        serviceId={service.id}
                        serviceTitle={service.title}
                      />
                    </div>
                  ),
                },
              ]}
              getRowKey={(service) => service.id}
              rows={services}
            />
          </div>
        </Card>
      )}
    </div>
  )
}
