import { apiRequest, toQueryString } from "@/lib/api/client"
import type {
  PaginatedData,
  Service,
  ServiceCategory,
  ServiceMode,
  ServiceSort,
} from "@/types"

export interface ServicesQueryInput {
  search?: string
  category?: ServiceCategory | ""
  mode?: ServiceMode | ""
  sort?: ServiceSort
  page?: number
  limit?: number
}

export interface ServiceInput {
  title: string
  category: ServiceCategory
  description: string
  basePrice: number
  estimatedDuration: string
  mode: ServiceMode
  area: string
  image: string
}

export type ServiceUpdateInput = Partial<ServiceInput>

export const servicesApi = {
  getFeatured(limit = 6) {
    return apiRequest<Service[]>(
      `/services/featured${toQueryString({ limit })}`
    )
  },

  list(params: ServicesQueryInput = {}) {
    return apiRequest<PaginatedData<Service>>(
      `/services${toQueryString({
        search: params.search,
        category: params.category,
        mode: params.mode,
        sort: params.sort,
        page: params.page,
        limit: params.limit,
      })}`
    )
  },

  getById(id: string) {
    return apiRequest<Service>(`/services/${encodeURIComponent(id)}`)
  },

  create(input: ServiceInput) {
    return apiRequest<Service>("/services", {
      method: "POST",
      body: input,
    })
  },

  update(id: string, input: ServiceUpdateInput) {
    return apiRequest<Service>(`/services/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: input,
    })
  },

  delete(id: string) {
    return apiRequest<void>(`/services/${encodeURIComponent(id)}`, {
      method: "DELETE",
    })
  },

  setAvailability(id: string, available: boolean) {
    return apiRequest<Service>(
      `/services/${encodeURIComponent(id)}/availability`,
      {
        method: "PATCH",
        body: { available },
      }
    )
  },
}
