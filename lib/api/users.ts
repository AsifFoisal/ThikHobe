import { apiRequest, toQueryString } from "@/lib/api/client"
import { mapUser, type BackendList, type BackendUser } from "@/lib/api/mappers"
import type { PaginatedData, User, UserRole } from "@/types"

export interface UserListInput {
  search?: string
  role?: UserRole | "all"
  page?: number
  limit?: number
}

export interface UpdateProfileInput {
  name: string
  phone?: string
  area?: string
  bio?: string
  image?: string
}

const toPage = (items: User[]): PaginatedData<User> => ({
  items,
  pagination: {
    page: 1,
    limit: Math.max(items.length, 1),
    total: items.length,
    totalPages: 1,
  },
})

export const usersApi = {
  async list(params: UserListInput = {}) {
    const data = await apiRequest<BackendList<BackendUser>>(
      `/admin/users${toQueryString({
        search: params.search,
        role: params.role === "all" ? undefined : params.role,
      })}`
    )
    return toPage(data.items.map(mapUser))
  },

  async updateRole(id: string, role: UserRole) {
    const data = await apiRequest<{ success: boolean; user: BackendUser }>(
      `/admin/users/${encodeURIComponent(id)}/role`,
      { method: "PATCH", body: { role } }
    )
    return mapUser(data.user)
  },

  async updateProfile(input: UpdateProfileInput) {
    const data = await apiRequest<BackendUser>("/users/profile", {
      method: "PATCH",
      body: input,
    })
    return mapUser(data)
  },
}
