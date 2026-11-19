import { SAMPLE_SERVICES, type SampleService } from "@/data/sample-services"
import { isServiceCategory, isServiceMode, isServiceSort } from "@/constants"
import type {
  PaginatedData,
  ServiceCategory,
  ServiceMode,
  ServiceSort,
} from "@/types"

export const SERVICES_PAGE_SIZE = 9

export interface ServicesQueryState {
  search: string
  category: ServiceCategory | ""
  mode: ServiceMode | ""
  sort: ServiceSort
  page: number
}

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "")
}

export function parseServicesQuery(
  params: Record<string, string | string[] | undefined>
): ServicesQueryState {
  const search = firstValue(params.search).trim()
  const category = firstValue(params.category)
  const mode = firstValue(params.mode)
  const sort = firstValue(params.sort)
  const requestedPage = Number.parseInt(firstValue(params.page), 10)

  return {
    search,
    category: isServiceCategory(category) ? category : "",
    mode: isServiceMode(mode) ? mode : "",
    sort: isServiceSort(sort) ? sort : "newest",
    page:
      Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1,
  }
}

export function buildServicesHref(
  state: ServicesQueryState,
  overrides: Partial<ServicesQueryState> = {}
) {
  const merged = { ...state, ...overrides }
  const params = new URLSearchParams()
  const search = merged.search.trim()
  const page = Math.max(1, merged.page)

  if (search) params.set("search", search)
  if (merged.category) params.set("category", merged.category)
  if (merged.mode) params.set("mode", merged.mode)
  if (merged.sort !== "newest") params.set("sort", merged.sort)
  if (page > 1) params.set("page", String(page))

  const query = params.toString()
  return query ? `/services?${query}` : "/services"
}

export function hasServiceFilters(state: ServicesQueryState) {
  return Boolean(state.search || state.category || state.mode)
}

export function hasNonDefaultServiceQuery(state: ServicesQueryState) {
  return hasServiceFilters(state) || state.sort !== "newest"
}

/**
 * Server-side query over the static presentation data.
 * The page consumes the same shape a MongoDB query layer would return;
 * replace these filtering and slicing internals when the backend is in scope.
 */
export function queryServices(
  state: ServicesQueryState
): PaginatedData<SampleService> {
  const search = state.search.trim().toLowerCase()

  let results = SAMPLE_SERVICES.filter(
    (service) => service.approvalStatus === "approved" && service.available
  )

  if (search) {
    const terms = search.split(/\s+/).filter(Boolean)
    results = results.filter((service) => {
      const words = `${service.title} ${service.category}`
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter(Boolean)
      return terms.every((term) => words.some((word) => word.startsWith(term)))
    })
  }

  if (state.category) {
    results = results.filter((service) => service.category === state.category)
  }

  if (state.mode) {
    results = results.filter((service) => service.mode === state.mode)
  }

  switch (state.sort) {
    case "price-asc":
      results.sort((a, b) => a.basePrice - b.basePrice)
      break
    case "price-desc":
      results.sort((a, b) => b.basePrice - a.basePrice)
      break
    default:
      results.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
  }

  const total = results.length
  const totalPages = Math.ceil(total / SERVICES_PAGE_SIZE)
  const page = Math.min(Math.max(1, state.page), Math.max(totalPages, 1))
  const start = (page - 1) * SERVICES_PAGE_SIZE
  const items = results.slice(start, start + SERVICES_PAGE_SIZE)

  return {
    items,
    pagination: {
      page,
      limit: SERVICES_PAGE_SIZE,
      total,
      totalPages,
    },
  }
}
