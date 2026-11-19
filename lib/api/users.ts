import { apiRequest, toQueryString } from "@/lib/api/client"
import type {
  PaginatedData,
  SessionUser,
  User,
  UserRole,
} from "@/types"

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

export const usersApi = {
  list(params: UserListInput = {}) {
    return apiRequest<PaginatedData<User>>(
      `/users${toQueryString({
        search: params.search,
        role: params.role === "all" ? undefined : params.role,
        page: params.page,
        limit: params.limit,
      })}`
    )
  },

  updateRole(id: string, role: UserRole) {
    return apiRequest<User>(`/users/${encodeURIComponent(id)}/role`, {
      method: "PATCH",
      body: { role },
    })
  },

  updateProfile(input: UpdateProfileInput) {
    return apiRequest<SessionUser>("/users/me/profile", {
      method: "PATCH",
      body: input,
    })
  },
}
