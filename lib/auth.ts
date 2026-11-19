import "server-only"

import { betterAuth } from "better-auth"
import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { jwt } from "better-auth/plugins"
import { APIError, createAuthMiddleware } from "better-auth/api"
import { MongoClient } from "mongodb"

import type { UserRole } from "@/types"

const mongoUri = process.env.MONGODB_URI
const secret = process.env.BETTER_AUTH_SECRET

if (!mongoUri) throw new Error("MONGODB_URI is required")
if (!secret) throw new Error("BETTER_AUTH_SECRET is required")

const baseURL =
  process.env.BETTER_AUTH_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  "http://localhost:3000"

// Reuse one client across Next.js dev reloads.
const globalForMongo = globalThis as unknown as {
  fixmateMongo?: { uri: string; client: MongoClient }
}
const cachedMongo = globalForMongo.fixmateMongo
const client =
  cachedMongo?.uri === mongoUri ? cachedMongo.client : new MongoClient(mongoUri)
if (process.env.NODE_ENV !== "production") {
  globalForMongo.fixmateMongo = { uri: mongoUri, client }
}

const trustedOrigins = Array.from(
  new Set(
    [baseURL, process.env.NEXT_PUBLIC_SITE_URL ?? ""]
      .map((origin) => origin.trim())
      .filter(Boolean)
  )
)

const roleFromInput = (role: unknown): UserRole =>
  role === "technician" ? "technician" : "customer"

export const auth = betterAuth({
  appName: "FixMate",
  baseURL,
  secret,
  trustedOrigins,

  // Better Auth's user collection is the application's only users collection.
  database: mongodbAdapter(client.db(process.env.DB_NAME ?? "fixmate")),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },

  user: {
    modelName: "users",
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "customer",
        input: true,
      },
      phone: { type: "string", required: false, defaultValue: "", input: true },
      area: { type: "string", required: false, defaultValue: "", input: true },
      bio: { type: "string", required: false, defaultValue: "", input: true },
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => ({
          data: {
            ...user,
            name: typeof user.name === "string" ? user.name.trim() : user.name,
            // Admin can never be self-registered, even with a crafted request.
            role: roleFromInput((user as { role?: unknown }).role),
          },
        }),
      },
    },
  },

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const body = (ctx.body ?? {}) as { password?: unknown }
        const password = typeof body.password === "string" ? body.password : ""
        if (password && !/[A-Z]/.test(password)) {
          throw new APIError("BAD_REQUEST", {
            message: "Password must contain an uppercase letter",
          })
        }
        if (password && !/[a-z]/.test(password)) {
          throw new APIError("BAD_REQUEST", {
            message: "Password must contain a lowercase letter",
          })
        }
      }

      // Role is server-owned after registration.
      if (ctx.path === "/update-user") {
        const body = (ctx.body ?? {}) as Record<string, unknown>
        if ("role" in body) {
          throw new APIError("BAD_REQUEST", {
            message: "Role cannot be changed here",
          })
        }
      }
    }),
  },

  // The JWT plugin issues the short-lived token Express verifies through JWKS.
  plugins: [
    jwt({
      jwt: {
        issuer: process.env.JWT_ISSUER ?? "fixmate",
        audience: process.env.JWT_AUDIENCE ?? "fixmate-client",
        definePayload: ({ user }) => ({
          id: user.id,
          email: user.email,
          name: user.name,
          role: (user as { role?: string }).role ?? "customer",
          image: user.image ?? null,
        }),
      },
    }),
  ],
})
