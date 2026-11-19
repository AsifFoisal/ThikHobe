"use client"

import { Dialog } from "@base-ui/react/dialog"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

import { Button, buttonVariants } from "@/components/ui/button"
import { ROLE_LABELS } from "@/constants"
import { ApiError, usersApi } from "@/lib/api"
import { cn } from "@/lib/utils"
import type { User, UserRole } from "@/types"

const ROLES: UserRole[] = ["customer", "technician", "admin"]

export function ChangeRoleDialog({ user }: { user: User }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState<UserRole>(user.role)
  const [pending, setPending] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next) {
      setRole(user.role)
      setServerError(null)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPending(true)
    setServerError(null)

    try {
      await usersApi.updateRole(user.id, role)
      toast.success("User role updated")
      setOpen(false)
      router.refresh()
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "The role could not be updated."
      setServerError(message)
      toast.error(message)
    } finally {
      setPending(false)
    }
  }

  return (
    <Dialog.Root onOpenChange={handleOpenChange} open={open}>
      <Dialog.Trigger
        className={buttonVariants({ size: "sm", variant: "outline" })}
      >
        Change role
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[60] bg-ink/50 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-[60] w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-line bg-card p-6 text-ink shadow-lift transition-[scale,opacity] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0">
          <Dialog.Title className="type-h3">Change role</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm leading-6 text-muted-ink">
            Choose a new role for {user.name}. The change applies to the
            existing account immediately.
          </Dialog.Description>

          <form className="mt-5" onSubmit={handleSubmit}>
            <label
              className="text-[0.8125rem] font-medium text-ink"
              htmlFor={`role-${user.id}`}
            >
              Role
            </label>
            <select
              className={cn(
                "mt-1.5 h-11 w-full rounded-[0.625rem] border border-line-strong bg-paper px-3 text-sm text-ink transition-colors focus-visible:border-fern focus-visible:ring-2 focus-visible:ring-fern/20 focus-visible:outline-none"
              )}
              id={`role-${user.id}`}
              onChange={(event) => {
                setRole(event.target.value as UserRole)
                setServerError(null)
              }}
              value={role}
            >
              {ROLES.map((option) => (
                <option key={option} value={option}>
                  {ROLE_LABELS[option]}
                </option>
              ))}
            </select>

            {serverError ? (
              <p
                className="mt-3 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs leading-5 text-status-red"
                role="alert"
              >
                {serverError}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-line pt-4">
              <Dialog.Close
                className={buttonVariants({ size: "sm", variant: "outline" })}
              >
                Cancel
              </Dialog.Close>
              <Button
                disabled={pending || role === user.role}
                size="sm"
                type="submit"
              >
                {pending ? "Saving…" : "Save role"}
              </Button>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
