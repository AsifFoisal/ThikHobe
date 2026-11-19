import { ChevronDown, Search } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import {
  SERVICE_CATEGORIES,
  SERVICE_MODES,
  SERVICE_SORT_OPTIONS,
} from "@/constants"
import { cn } from "@/lib/utils"
import type { ServicesQueryState } from "@/data/services-query"

const controlClass =
  "h-10 w-full rounded-[0.625rem] border border-line-strong bg-paper px-3 text-sm text-ink transition-colors placeholder:text-muted-ink focus-visible:border-fern focus-visible:ring-2 focus-visible:ring-fern/20 focus-visible:outline-none"

const labelClass = "text-[0.8125rem] font-medium text-ink"

export function ServicesFilters({ state }: { state: ServicesQueryState }) {
  return (
    <form
      action="/services"
      aria-label="Filter services"
      className="mt-8 rounded-xl border border-line bg-card p-4 sm:p-5"
      method="get"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_9.5rem_10rem_10.5rem_auto] lg:items-end">
        <div className="sm:col-span-2 lg:col-span-1">
          <label className={labelClass} htmlFor="services-search">
            Search
          </label>
          <div className="relative mt-1.5">
            <Search
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-ink"
            />
            <input
              autoComplete="off"
              className={cn(controlClass, "pl-10")}
              defaultValue={state.search}
              id="services-search"
              name="search"
              placeholder="Title or category"
              type="search"
            />
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="services-category">
            Category
          </label>
          <div className="relative mt-1.5">
            <select
              className={cn(controlClass, "appearance-none pr-9")}
              defaultValue={state.category}
              id="services-category"
              name="category"
            >
              <option value="">All categories</option>
              {SERVICE_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden
              className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-ink"
            />
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="services-mode">
            Service mode
          </label>
          <div className="relative mt-1.5">
            <select
              className={cn(controlClass, "appearance-none pr-9")}
              defaultValue={state.mode}
              id="services-mode"
              name="mode"
            >
              <option value="">All modes</option>
              {SERVICE_MODES.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden
              className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-ink"
            />
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="services-sort">
            Sort by
          </label>
          <div className="relative mt-1.5">
            <select
              className={cn(controlClass, "appearance-none pr-9")}
              defaultValue={state.sort}
              id="services-sort"
              name="sort"
            >
              {SERVICE_SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden
              className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-ink"
            />
          </div>
        </div>

        <button
          className={cn(
            buttonVariants({ size: "default" }),
            "w-full sm:col-span-1 lg:w-auto"
          )}
          type="submit"
        >
          Apply filters
        </button>
      </div>
    </form>
  )
}
