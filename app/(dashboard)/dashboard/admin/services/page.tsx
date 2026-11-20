import type { Metadata } from "next"
import { CheckCircle2, ShieldCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { ServiceApprovalActions } from "@/components/admin/ServiceApprovalActions"
import { DataTable } from "@/components/dashboard/DataTable"
import { Badge } from "@/components/ui/Badge"
import { buttonVariants } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { ApprovalStatusBadge } from "@/components/ui/StatusBadge"
import { EmptyState } from "@/components/ui/State"
import { formatDate, formatPrice } from "@/lib/format"
import { getAdminServices } from "@/lib/server-data"
import { cn } from "@/lib/utils"
import type { ServiceApprovalStatus } from "@/types"

export const metadata: Metadata = {
  title: "Service approvals",
  description:
    "Service approval queue with pending, approved, and rejected filters.",
}

const FILTERS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
] as const

type ServiceFilter = (typeof FILTERS)[number]["value"]

function isFilter(value: string | undefined): value is ServiceFilter {
  return FILTERS.some((filter) => filter.value === value)
}

export default async function AdminServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string | string[] }>
}) {
  const params = await searchParams
  const rawStatus = Array.isArray(params.status)
    ? params.status[0]
    : params.status
  const activeFilter: ServiceFilter = isFilter(rawStatus)
    ? rawStatus
    : "pending"

  const allServices = await getAdminServices()

  const counts = {
    all: allServices.length,
    pending: allServices.filter(
      (service) => service.approvalStatus === "pending"
    ).length,
    approved: allServices.filter(
      (service) => service.approvalStatus === "approved"
    ).length,
    rejected: allServices.filter(
      (service) => service.approvalStatus === "rejected"
    ).length,
  }

  const services =
    activeFilter === "all"
      ? [...allServices].sort((a, b) => {
          const rank = (status: ServiceApprovalStatus) =>
            status === "pending" ? 0 : 1
          return (
            rank(a.approvalStatus) - rank(b.approvalStatus) ||
            Date.parse(b.createdAt) - Date.parse(a.createdAt)
          )
        })
      : allServices
          .filter((service) => service.approvalStatus === activeFilter)
          .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="max-w-2xl">
        <h1 className="type-h1">Service approvals</h1>
        <p className="type-lead mt-3">
          Review new listings before they reach customers, with pending services
          surfaced first.
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-line p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="type-h3">Services</h2>
            <p className="mt-1 text-sm text-muted-ink">
              {services.length} {services.length === 1 ? "service" : "services"}{" "}
              in this view
            </p>
          </div>
          <Badge tone="neutral">{counts.pending} pending review</Badge>
        </div>

        <nav
          aria-label="Filter services by approval status"
          className="flex flex-wrap gap-2 border-b border-line p-4"
        >
          {FILTERS.map((filter) => {
            const active = activeFilter === filter.value
            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-fern focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:outline-none",
                  active
                    ? "border-spruce bg-spruce text-paper"
                    : "border-line-strong bg-card text-muted-ink hover:border-spruce/35 hover:bg-sage/50 hover:text-spruce"
                )}
                href={
                  filter.value === "pending"
                    ? "/dashboard/admin/services"
                    : `/dashboard/admin/services?status=${filter.value}`
                }
                key={filter.value}
              >
                {filter.label}
                <span
                  className={cn(
                    "tabular rounded-full px-1.5 text-[11px]",
                    active ? "bg-paper/15 text-paper" : "bg-sage text-muted-ink"
                  )}
                >
                  {counts[filter.value]}
                </span>
              </Link>
            )
          })}
        </nav>

        {services.length === 0 ? (
          <EmptyState
            action={
              <Link
                className={buttonVariants({ size: "sm" })}
                href="/dashboard/admin/services"
              >
                View pending queue
              </Link>
            }
            description="There are no services in this approval state."
            icon={ShieldCheck}
            title="No services found"
          />
        ) : (
          <div>
            <DataTable
              caption="All platform services awaiting review or already reviewed"
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
                        <p className="font-medium text-ink">{service.title}</p>
                        <p className="tabular mt-1 text-[11px] tracking-[0.06em] text-muted-ink uppercase">
                          #{service.id}
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "technician",
                  header: "Technician",
                  cell: (service) => (
                    <span className="text-muted-ink">
                      {service.technician.name}
                    </span>
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
                  align: "right",
                  cell: (service) => (
                    <span className="tabular font-medium text-ink">
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
                  key: "created",
                  header: "Created",
                  cell: (service) => (
                    <span className="whitespace-nowrap text-muted-ink">
                      {formatDate(service.createdAt)}
                    </span>
                  ),
                },
                {
                  key: "actions",
                  header: "Actions",
                  className: "text-right",
                  cell: (service) =>
                    service.approvalStatus === "pending" ? (
                      <ServiceApprovalActions service={service} />
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-muted-ink">
                        {service.approvalStatus === "approved" ? (
                          <>
                            <CheckCircle2
                              aria-hidden
                              className="size-3.5 text-fern"
                            />
                            Reviewed
                          </>
                        ) : (
                          "Reviewed"
                        )}
                      </span>
                    ),
                },
              ]}
              getRowKey={(service) => service.id}
              rows={services}
            />
          </div>
        )}
      </Card>
    </div>
  )
}
