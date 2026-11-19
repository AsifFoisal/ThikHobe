import type { Metadata } from "next"
import { SearchX, ShieldCheck, X } from "lucide-react"
import Link from "next/link"

import { ServiceCard } from "@/components/services/service-card"
import { ServicesFilters } from "@/components/services/services-filters"
import { ServicesPagination } from "@/components/services/services-pagination"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { EmptyState } from "@/components/ui/state"
import {
  buildServicesHref,
  hasNonDefaultServiceQuery,
  hasServiceFilters,
  parseServicesQuery,
  queryServices,
} from "@/data/services-query"

export const metadata: Metadata = {
  title: "Browse repair services",
  description:
    "Compare approved repair services from verified technicians. Search by device or category, filter by service mode, and choose the repair that fits.",
}

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const query = parseServicesQuery(await searchParams)
  const { items, pagination } = queryServices(query)
  const state = { ...query, page: pagination.page }
  const activeFilters = hasServiceFilters(query)
  const nonDefaultQuery = hasNonDefaultServiceQuery(query)

  const filters: { label: string; href: string }[] = []

  if (query.search) {
    filters.push({
      label: `Search: ${query.search}`,
      href: buildServicesHref(state, { search: "", page: 1 }),
    })
  }
  if (query.category) {
    filters.push({
      label: `Category: ${query.category}`,
      href: buildServicesHref(state, { category: "", page: 1 }),
    })
  }
  if (query.mode) {
    filters.push({
      label: `Mode: ${query.mode}`,
      href: buildServicesHref(state, { mode: "", page: 1 }),
    })
  }

  const start =
    pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1
  const end = Math.min(pagination.page * pagination.limit, pagination.total)

  return (
    <div className="container-page pt-10 pb-16 lg:pt-14">
      <div className="max-w-3xl">
        <h1 className="type-h1">Browse repair services</h1>
        <p className="type-lead mt-4">
          Compare approved services from verified technicians. Search by device
          or category, filter by how the repair happens, and choose the option
          that fits.
        </p>
        <p className="type-meta mt-4 inline-flex items-center gap-1.5">
          <ShieldCheck aria-hidden className="size-4 text-fern" />
          All listings are reviewed before they appear.
        </p>
      </div>

      <ServicesFilters
        key={`${state.search}|${state.category}|${state.mode}|${state.sort}`}
        state={state}
      />

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-sm text-muted-ink">
          {pagination.total === 0 ? (
            query.search ? (
              <>No results for “{query.search}”.</>
            ) : (
              <>No services found.</>
            )
          ) : (
            <>
              Showing{" "}
              <span className="font-semibold text-ink">
                {start}–{end}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-ink">{pagination.total}</span>{" "}
              {pagination.total === 1 ? "service" : "services"}
              {query.search ? <> for “{query.search}”</> : null}.
            </>
          )}
        </p>
        {nonDefaultQuery ? (
          <Link
            className="text-sm font-semibold text-spruce transition-colors hover:text-fern"
            href="/services"
          >
            Clear filters
          </Link>
        ) : null}
      </div>

      {filters.length > 0 ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {filters.map((filter) => (
            <Link
              aria-label={`Remove ${filter.label} filter`}
              className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-sage px-3 py-1.5 text-xs font-semibold text-spruce transition-colors hover:bg-sage-strong"
              href={filter.href}
              key={filter.label}
            >
              <span className="truncate">{filter.label}</span>
              <X aria-hidden className="size-3 shrink-0" />
            </Link>
          ))}
        </div>
      ) : null}

      <h2 className="sr-only">Available repair services</h2>
      {items.length > 0 ? (
        <>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((service, index) => (
              <ServiceCard
                imagePosition={service.imagePosition}
                key={service.id}
                priority={index < 3}
                service={service}
              />
            ))}
          </div>
          <ServicesPagination pagination={pagination} state={state} />
        </>
      ) : (
        <Card className="mt-8">
          <EmptyState
            action={
              activeFilters ? (
                <Link className={buttonVariants()} href="/services">
                  Clear filters
                </Link>
              ) : (
                <Link
                  className={buttonVariants({ variant: "outline" })}
                  href="/"
                >
                  Back to home
                </Link>
              )
            }
            description={
              activeFilters
                ? "Try a different search or category, or clear the filters to see every approved service."
                : "Approved services from technicians will appear here once they are listed."
            }
            icon={SearchX}
            title={
              activeFilters
                ? "No services match these filters"
                : "No services are available yet"
            }
          />
        </Card>
      )}
    </div>
  )
}
