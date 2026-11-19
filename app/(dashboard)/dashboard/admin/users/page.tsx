import type { Metadata } from "next"
import { LockKeyhole, SearchX } from "lucide-react"
import Link from "next/link"

import { ChangeRoleDialog } from "@/components/admin/change-role-dialog"
import { DataTable } from "@/components/dashboard/data-table"
import { FilterSelect } from "@/components/dashboard/filter-select"
import { SearchInput } from "@/components/dashboard/search-input"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RoleBadge } from "@/components/ui/role-badge"
import { EmptyState } from "@/components/ui/state"
import { DEMO_ADMIN } from "@/constants/demo"
import { SAMPLE_PLATFORM_USERS } from "@/data/sample-platform"
import { formatDate } from "@/lib/format"
import type { UserRole } from "@/types"

export const metadata: Metadata = {
  title: "Manage users",
  description:
    "Sample platform user directory with role filtering, search, and role-change previews.",
}

const ROLE_OPTIONS = [
  { value: "all", label: "All roles" },
  { value: "customer", label: "Customer" },
  { value: "technician", label: "Technician" },
  { value: "admin", label: "Admin" },
] as const

function isRoleFilter(value: string | undefined): value is UserRole | "all" {
  return ROLE_OPTIONS.some((option) => option.value === value)
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[]; role?: string | string[] }>
}) {
  const params = await searchParams
  const rawQuery = Array.isArray(params.q) ? params.q[0] : params.q
  const rawRole = Array.isArray(params.role) ? params.role[0] : params.role
  const query = (rawQuery ?? "").trim()
  const roleFilter = isRoleFilter(rawRole) ? rawRole : "all"
  const normalizedQuery = query.toLowerCase()

  const users = SAMPLE_PLATFORM_USERS.filter((user) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      user.name.toLowerCase().includes(normalizedQuery) ||
      user.email.toLowerCase().includes(normalizedQuery)
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesQuery && matchesRole
  })

  const hasFilters = query.length > 0 || roleFilter !== "all"

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="max-w-2xl">
        <h1 className="type-h1">Manage users</h1>
        <p className="type-lead mt-3">
          Review platform accounts, search by identity, and inspect the role
          structure behind FixMate.
        </p>
        <p className="type-meta mt-2">
          Preview workspace · sample users. Role changes are visual previews and
          do not alter accounts.
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-line p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="type-h3">Platform users</h2>
            <p className="mt-1 text-sm text-muted-ink">
              {users.length} of {SAMPLE_PLATFORM_USERS.length} accounts
            </p>
          </div>
          <Badge tone="neutral">{SAMPLE_PLATFORM_USERS.length} total</Badge>
        </div>

        <form
          action="/dashboard/admin/users"
          className="flex flex-col gap-2 border-b border-line p-4 sm:flex-row sm:items-center"
          method="get"
        >
          <SearchInput
            className="flex-1"
            defaultValue={query}
            id="admin-user-search"
            name="q"
            placeholder="Search by name or email…"
          />
          <FilterSelect
            className="sm:w-44"
            defaultValue={roleFilter}
            id="admin-user-role"
            label="Filter by role"
            name="role"
            options={[...ROLE_OPTIONS]}
          />
          <div className="flex gap-2">
            <Button size="default" type="submit">
              Apply
            </Button>
            {hasFilters ? (
              <Link
                className={buttonVariants({
                  size: "default",
                  variant: "ghost",
                })}
                href="/dashboard/admin/users"
              >
                Clear
              </Link>
            ) : null}
          </div>
        </form>

        {users.length === 0 ? (
          <EmptyState
            action={
              <Link
                className={buttonVariants({ size: "sm" })}
                href="/dashboard/admin/users"
              >
                Clear filters
              </Link>
            }
            description="No sample account matches this search and role combination."
            icon={SearchX}
            title="No users found"
          />
        ) : (
          <div className="p-4">
            <DataTable
              caption="Sample platform users"
              tableFrom="xl"
              columns={[
                {
                  key: "name",
                  header: "User",
                  cell: (user) => (
                    <div className="flex items-center gap-3">
                      <Avatar name={user.name} size="sm" src={user.image} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-ink">{user.name}</p>
                          {user.id === DEMO_ADMIN.id ? (
                            <Badge tone="neutral">You</Badge>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "email",
                  header: "Email",
                  cell: (user) => (
                    <span className="text-muted-ink">{user.email}</span>
                  ),
                },
                {
                  key: "role",
                  header: "Role",
                  cell: (user) => <RoleBadge role={user.role} />,
                },
                {
                  key: "joined",
                  header: "Joined",
                  cell: (user) => (
                    <span className="whitespace-nowrap text-muted-ink">
                      {formatDate(user.createdAt)}
                    </span>
                  ),
                },
                {
                  key: "actions",
                  header: "Actions",
                  className: "text-right",
                  cell: (user) =>
                    user.id === DEMO_ADMIN.id ? (
                      <Button
                        disabled
                        size="sm"
                        title="You cannot change your own role."
                        variant="outline"
                      >
                        <LockKeyhole aria-hidden className="size-3.5" />
                        Current account
                      </Button>
                    ) : (
                      <ChangeRoleDialog user={user} />
                    ),
                },
              ]}
              getRowKey={(user) => user.id}
              rows={users}
            />
          </div>
        )}
      </Card>
    </div>
  )
}
