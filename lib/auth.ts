import "server-only"

import { betterAuth } from "better-auth"
import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { jwt } from "better-auth/plugins"
import { APIError, createAuthMiddleware } from "better-auth/api"
import { attachDatabasePool } from "@vercel/functions"
import {
  MongoClient,
  MongoNotConnectedError,
  MongoTopologyClosedError,
  type Db,
} from "mongodb"

import type { UserRole } from "@/types"

const mongoUri = process.env.MONGODB_URI
const secret = process.env.BETTER_AUTH_SECRET

if (!mongoUri) throw new Error("MONGODB_URI is required")
if (!secret) throw new Error("BETTER_AUTH_SECRET is required")

const baseURL =
  process.env.BETTER_AUTH_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  "http://localhost:3000"

// Reuse one client across Next.js reloads and warm serverless invocations.
// Vercel Fluid Compute suspends the instance between requests, so open sockets
// can be frozen before the driver drains them, and the driver permanently
// closes a topology when its first connection attempt fails. Either way a
// cached client can come back closed. Idle connections are therefore drained
// before suspension, and a closed-topology read retries once on a fresh client.
const dbName = process.env.DB_NAME ?? "thikhobe"
const mongoOptions = {
  maxIdleTimeMS: 10_000,
  serverSelectionTimeoutMS: 10_000,
  maxPoolSize: 10,
}

const globalForMongo = globalThis as unknown as {
  thikhobeMongo?: { uri: string; client: MongoClient }
}

const createMongoClient = () => {
  const client = new MongoClient(mongoUri, mongoOptions)
  attachDatabasePool(client)
  return client
}

const cachedMongo = globalForMongo.thikhobeMongo
const client =
  cachedMongo?.uri === mongoUri ? cachedMongo.client : createMongoClient()
globalForMongo.thikhobeMongo = { uri: mongoUri, client }

const currentMongoClient = () => {
  if (globalForMongo.thikhobeMongo?.uri === mongoUri) {
    return globalForMongo.thikhobeMongo.client
  }
  const next = createMongoClient()
  globalForMongo.thikhobeMongo = { uri: mongoUri, client: next }
  return next
}

const replaceMongoClient = () => {
  void globalForMongo.thikhobeMongo?.client.close().catch(() => {})
  const next = createMongoClient()
  globalForMongo.thikhobeMongo = { uri: mongoUri, client: next }
  return next
}

// Two driver states describe a client that can no longer be used: a topology
// that was closed (failed first connection or explicit close) and a client
// whose topology was dropped. Both are recoverable only with a new client.
const isDeadClient = (error: unknown) =>
  error instanceof MongoTopologyClosedError ||
  error instanceof MongoNotConnectedError ||
  (error instanceof Error &&
    (error.name === "MongoTopologyClosedError" ||
      error.name === "MongoNotConnectedError"))

// Runs a database call and retries it once on a fresh client when the cached
// client's topology was closed. Cursors are covered too, because aggregate()
// is only awaited at toArray().
function guarded<T>(run: () => T, retried = false): T {
  const retry = (error: unknown): T => {
    if (!retried && isDeadClient(error)) {
      replaceMongoClient()
      return guarded(run, true)
    }
    throw error
  }

  try {
    const value = run()
    if (value && typeof (value as unknown as PromiseLike<T>).then === "function") {
      return Promise.resolve(value).catch(retry) as T
    }
    if (
      value &&
      typeof (value as unknown as { toArray?: unknown }).toArray === "function"
    ) {
      const cursor = value as unknown as {
        toArray: (...args: unknown[]) => Promise<unknown>
      }
      cursor.toArray = (...args: unknown[]) =>
        guarded(() => {
          const fresh = run() as unknown as {
            toArray: (...args: unknown[]) => Promise<unknown>
          }
          return fresh.toArray(...args)
        }, retried)
      return value
    }
    return value
  } catch (error) {
    return retry(error)
  }
}

const resilientCollection = (name: string) =>
  new Proxy({} as Record<string | symbol, unknown>, {
    get(_target, prop) {
      const collection = currentMongoClient()
        .db(dbName)
        .collection(name) as unknown as Record<string | symbol, unknown>
      const sample = collection[prop]
      if (typeof sample !== "function") return sample
      return (...args: unknown[]) =>
        guarded(() => {
          const fresh = currentMongoClient()
            .db(dbName)
            .collection(name) as unknown as Record<
            string | symbol,
            (...callArgs: unknown[]) => unknown
          >
          return fresh[prop](...args)
        })
    },
  })

// Better Auth receives a Db facade that always resolves the current client, so
// a replaced MongoClient is picked up without rebuilding the auth instance.
const authDb = new Proxy({} as Db, {
  get(_target, prop) {
    if (prop === "collection") {
      return (name: string) => resilientCollection(name)
    }
    const db = currentMongoClient().db(dbName) as unknown as Record<
      string | symbol,
      unknown
    >
    const value = db[prop]
    if (typeof value !== "function") return value
    return (...args: unknown[]) =>
      guarded(() => {
        const fresh = currentMongoClient().db(dbName) as unknown as Record<
          string | symbol,
          (...callArgs: unknown[]) => unknown
        >
        return fresh[prop](...args)
      })
  },
}) as Db

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
  appName: "ThikHobe",
  baseURL,
  secret,
  trustedOrigins,

  // Better Auth's user collection is the application's only users collection.
  database: mongodbAdapter(authDb),

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
        issuer: process.env.JWT_ISSUER ?? "thikhobe",
        audience: process.env.JWT_AUDIENCE ?? "thikhobe-client",
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
