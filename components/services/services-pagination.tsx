import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { getPageItems } from "@/lib/pagination"
import {
  buildServicesHref,
  type ServicesQueryState,
} from "@/lib/services-query"
import { cn } from "@/lib/utils"
import type { PaginationMeta } from "@/types"

export function ServicesPagination({
  state,
  pagination,
}: {
  state: ServicesQueryState
  pagination: PaginationMeta
}) {
  if (pagination.totalPages <= 1) return null

  const current = pagination.page
  const items = getPageItems(current, pagination.totalPages)
  const disabledClass = cn(
    buttonVariants({ size: "sm", variant: "outline" }),
    "pointer-events-none opacity-40"
  )
  const pageLinkClass =
    "inline-flex size-9 items-center justify-center rounded-[0.625rem] text-sm font-semibold text-muted-ink transition-colors hover:bg-sage hover:text-spruce focus-visible:ring-2 focus-visible:ring-fern focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:outline-none"

  return (
    <nav
      aria-label="Services pagination"
      className="mt-10 border-t border-line pt-6"
    >
      <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-between">
        <div className="flex items-center justify-between gap-2">
          {current > 1 ? (
            <Link
              className={buttonVariants({ size: "sm", variant: "outline" })}
              href={buildServicesHref(state, { page: current - 1 })}
            >
              <ChevronLeft aria-hidden />
              Previous
            </Link>
          ) : (
            <span aria-disabled="true" className={disabledClass}>
              <ChevronLeft aria-hidden />
              Previous
            </span>
          )}
        </div>

        <div className="order-first flex w-full flex-wrap items-center justify-center gap-1 sm:order-none sm:w-auto">
          {items.map((item, index) =>
            item === "ellipsis" ? (
              <span
                aria-hidden
                className="inline-flex size-9 items-center justify-center text-sm text-muted-ink"
                key={`ellipsis-${index}`}
              >
                …
              </span>
            ) : item === current ? (
              <span
                aria-current="page"
                className="inline-flex size-9 items-center justify-center rounded-[0.625rem] bg-spruce text-sm font-semibold text-paper"
                key={item}
              >
                {item}
              </span>
            ) : (
              <Link
                className={pageLinkClass}
                href={buildServicesHref(state, { page: item })}
                key={item}
              >
                {item}
              </Link>
            )
          )}
        </div>

        <div className="flex items-center justify-between gap-2">
          {current < pagination.totalPages ? (
            <Link
              className={buttonVariants({ size: "sm", variant: "outline" })}
              href={buildServicesHref(state, { page: current + 1 })}
            >
              Next
              <ChevronRight aria-hidden />
            </Link>
          ) : (
            <span aria-disabled="true" className={disabledClass}>
              Next
              <ChevronRight aria-hidden />
            </span>
          )}
        </div>
      </div>
    </nav>
  )
}
