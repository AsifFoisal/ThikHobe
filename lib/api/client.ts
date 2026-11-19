import { apiConfig } from "@/lib/api/config"
import type { ApiErrorResponse } from "@/types"

export class ApiError extends Error {
  readonly status: number
  readonly code?: string
  readonly fieldErrors?: Record<string, string[]>

  constructor(
    message: string,
    status = 0,
    code?: string,
    fieldErrors?: Record<string, string[]>
  ) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.code = code
    this.fieldErrors = fieldErrors
  }

  get isNetworkError() {
    return this.code === "NETWORK_ERROR"
  }

  get isUnauthorized() {
    return this.status === 401
  }

  get isForbidden() {
    return this.status === 403
  }

  get isNotFound() {
    return this.status === 404
  }
}

interface RequestOptions {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE"
  body?: unknown
  headers?: HeadersInit
  signal?: AbortSignal
}

function readPayload(text: string): unknown {
  if (!text) return undefined

  try {
    return JSON.parse(text) as unknown
  } catch {
    throw new ApiError(
      "The server returned an unexpected response.",
      502,
      "INVALID_RESPONSE"
    )
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  if (!apiConfig.baseUrl) {
    throw new ApiError(
      "The API base URL is not configured.",
      0,
      "API_NOT_CONFIGURED"
    )
  }

  const method = options.method ?? "GET"
  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData
  const headers = new Headers(options.headers)

  headers.set("Accept", "application/json")
  if (options.body !== undefined && !isFormData) {
    headers.set("Content-Type", "application/json")
  }

  // Express private routes expect the Better Auth JWT as a Bearer token.
  if (typeof window !== "undefined" && !headers.has("Authorization")) {
    const { getAuthToken } = await import("@/lib/auth-client")
    const token = await getAuthToken().catch(() => null)
    if (token) headers.set("Authorization", `Bearer ${token}`)
  }

  const url = `${apiConfig.baseUrl}${
    path.startsWith("/") ? path : `/${path}`
  }`

  let response: Response

  try {
    response = await fetch(url, {
      method,
      headers,
      credentials: "include",
      cache: "no-store",
      signal: options.signal,
      body:
        options.body === undefined
          ? undefined
          : isFormData
            ? (options.body as FormData)
            : JSON.stringify(options.body),
    })
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new ApiError(
      "Unable to reach the ThikHobe server. Check your connection and try again.",
      0,
      "NETWORK_ERROR"
    )
  }

  const text = await response.text()
  const payload = readPayload(text)

  if (isRecord(payload) && payload.success === false) {
    const apiError = payload as unknown as ApiErrorResponse
    throw new ApiError(
      apiError.message || "The request could not be completed.",
      response.status,
      apiError.code,
      apiError.fieldErrors
    )
  }

  if (!response.ok) {
    const message =
      isRecord(payload) && typeof payload.message === "string"
        ? payload.message
        : "The request could not be completed."
    const code =
      isRecord(payload) && typeof payload.code === "string"
        ? payload.code
        : undefined

    throw new ApiError(message, response.status, code)
  }

  if (payload === undefined) return undefined as T

  if (isRecord(payload) && "success" in payload && "data" in payload) {
    return payload.data as T
  }

  return payload as T
}

export function toQueryString(
  params: Record<string, string | number | boolean | undefined>
) {
  const query = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") continue
    query.set(key, String(value))
  }

  const stringified = query.toString()
  return stringified ? `?${stringified}` : ""
}
