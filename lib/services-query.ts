import {
  isServiceCategory,
  isServiceMode,
  isServiceSort,
} from "@/constants"
import type { ServiceCategory, ServiceMode, ServiceSort } from "@/types"

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
