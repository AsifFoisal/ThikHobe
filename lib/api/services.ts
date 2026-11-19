import { apiRequest, toQueryString } from "@/lib/api/client"
import {
  mapService,
  type BackendList,
  type BackendService,
} from "@/lib/api/mappers"
import type {
  PaginatedData,
  Service,
  ServiceApprovalStatus,
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

interface BackendServicePage {
  items: BackendService[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

const toBackendService = (input: ServiceInput) => ({
  title: input.title,
  category: input.category,
  description: input.description,
  basePrice: input.basePrice,
  estimatedDuration: input.estimatedDuration,
  serviceMode: input.mode,
  serviceArea: input.area,
  image: input.image,
})

const toBackendServicePatch = (input: ServiceUpdateInput) => ({
  ...(input.title !== undefined ? { title: input.title } : {}),
  ...(input.category !== undefined ? { category: input.category } : {}),
  ...(input.description !== undefined ? { description: input.description } : {}),
  ...(input.basePrice !== undefined ? { basePrice: input.basePrice } : {}),
  ...(input.estimatedDuration !== undefined
    ? { estimatedDuration: input.estimatedDuration }
    : {}),
  ...(input.mode !== undefined ? { serviceMode: input.mode } : {}),
  ...(input.area !== undefined ? { serviceArea: input.area } : {}),
  ...(input.image !== undefined ? { image: input.image } : {}),
})

export const servicesApi = {
  async getFeatured(limit = 6) {
    const data = await apiRequest<{ items: BackendService[] }>(
      `/services${toQueryString({ limit, sort: "newest" })}`
    )
    return data.items.map(mapService)
  },

  async list(params: ServicesQueryInput = {}) {
    const data = await apiRequest<BackendServicePage>(
      `/services${toQueryString({
        search: params.search,
        category: params.category,
        mode: params.mode,
        sort: params.sort,
        page: params.page,
        limit: params.limit,
      })}`
    )

    return {
      items: data.items.map(mapService),
      pagination: data.pagination,
    } satisfies PaginatedData<Service>
  },

  async getById(id: string) {
    const data = await apiRequest<BackendService>(
      `/services/${encodeURIComponent(id)}`
    )
    return mapService(data)
  },

  async mine() {
    const data = await apiRequest<BackendList<BackendService>>("/services/mine")
    return data.items.map(mapService)
  },

  async create(input: ServiceInput) {
    const data = await apiRequest<BackendService>("/services", {
      method: "POST",
      body: toBackendService(input),
    })
    return mapService(data)
  },

  async update(id: string, input: ServiceUpdateInput) {
    const data = await apiRequest<BackendService>(
      `/services/${encodeURIComponent(id)}`,
      { method: "PATCH", body: toBackendServicePatch(input) }
    )
    return mapService(data)
  },

  async approve(
    id: string,
    approvalStatus: Exclude<ServiceApprovalStatus, "pending">
  ) {
    const data = await apiRequest<BackendService>(
      `/admin/services/${encodeURIComponent(id)}/approval`,
      { method: "PATCH", body: { approvalStatus } }
    )
    return mapService(data)
  },

  async adminList() {
    const data = await apiRequest<BackendList<BackendService>>(
      "/admin/services"
    )
    return data.items.map(mapService)
  },

  delete(id: string) {
    return apiRequest<void>(`/services/${encodeURIComponent(id)}`, {
      method: "DELETE",
    })
  },

  async setAvailability(id: string, available: boolean) {
    const data = await apiRequest<BackendService>(
      `/services/${encodeURIComponent(id)}/availability`,
      { method: "PATCH", body: { isAvailable: available } }
    )
    return mapService(data)
  },
}
