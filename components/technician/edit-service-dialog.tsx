"use client"

import { Dialog } from "@base-ui/react/dialog"
import Image from "next/image"
import { useState } from "react"

import {
  Field,
  fieldControlClass,
  fieldTextareaClass,
} from "@/components/forms/field"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { SERVICE_CATEGORIES, SERVICE_MODES } from "@/constants"
import { cn } from "@/lib/utils"
import type { Service, ServiceCategory, ServiceMode } from "@/types"

interface EditServiceDialogProps {
  service: Service
}

interface EditValues {
  title: string
  category: ServiceCategory
  basePrice: string
  estimatedDuration: string
  mode: ServiceMode
  area: string
  description: string
}

function valuesFromService(service: Service): EditValues {
  return {
    title: service.title,
    category: service.category,
    basePrice: String(service.basePrice),
    estimatedDuration: service.estimatedDuration,
    mode: service.mode,
    area: service.area,
    description: service.description,
  }
}

export function EditServiceDialog({ service }: EditServiceDialogProps) {
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState<EditValues>(() =>
    valuesFromService(service)
  )
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [previewed, setPreviewed] = useState(false)

  const update = <K extends keyof EditValues>(
    key: K,
    value: EditValues[K]
  ) => {
    setValues((current) => ({ ...current, [key]: value }))
    setPreviewed(false)
  }

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next) {
      setValues(valuesFromService(service))
      setErrors({})
      setPreviewed(false)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: Record<string, string> = {}

    if (values.title.trim().length < 5) {
      nextErrors.title = "Use at least 5 characters."
    }
    if (!Number(values.basePrice) || Number(values.basePrice) <= 0) {
      nextErrors.basePrice = "Base price must be greater than zero."
    }
    if (values.estimatedDuration.trim().length < 3) {
      nextErrors.estimatedDuration = "Enter an estimated duration."
    }
    if (values.area.trim().length < 3) {
      nextErrors.area = "Enter the service area."
    }
    if (values.description.trim().length < 20) {
      nextErrors.description = "Describe the service in at least 20 characters."
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      setPreviewed(true)
    }
  }

  return (
    <Dialog.Root onOpenChange={handleOpenChange} open={open}>
      <Dialog.Trigger
        className={buttonVariants({ size: "sm", variant: "outline" })}
      >
        Edit
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[60] bg-ink/50 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-[60] max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-line bg-card p-6 text-ink shadow-lift transition-[scale,opacity] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0">
          <Dialog.Title className="type-h3">Edit service</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm leading-6 text-muted-ink">
            Update the listing details. In a connected build, saving would
            return this service to Pending approval.
          </Dialog.Description>

          <div className="mt-5 flex items-center gap-3 rounded-lg bg-paper p-3">
            <span className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-sage">
              <Image
                alt=""
                className="object-cover"
                fill
                sizes="48px"
                src={service.image}
              />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">
                {service.title}
              </p>
              <p className="mt-0.5 text-xs text-muted-ink">
                Current image · image editing is not connected
              </p>
            </div>
            <Badge tone="neutral">#{service.id}</Badge>
          </div>

          <form className="mt-5" noValidate onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                className="sm:col-span-2"
                error={errors.title}
                htmlFor={`edit-title-${service.id}`}
                label="Title"
                required
              >
                <input
                  className={cn(
                    fieldControlClass,
                    errors.title && "border-destructive"
                  )}
                  id={`edit-title-${service.id}`}
                  onChange={(event) => update("title", event.target.value)}
                  required
                  type="text"
                  value={values.title}
                />
              </Field>

              <Field
                htmlFor={`edit-category-${service.id}`}
                label="Category"
                required
              >
                <select
                  className={fieldControlClass}
                  id={`edit-category-${service.id}`}
                  onChange={(event) =>
                    update("category", event.target.value as ServiceCategory)
                  }
                  required
                  value={values.category}
                >
                  {SERVICE_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </Field>

              <Field htmlFor={`edit-mode-${service.id}`} label="Mode" required>
                <select
                  className={fieldControlClass}
                  id={`edit-mode-${service.id}`}
                  onChange={(event) =>
                    update("mode", event.target.value as ServiceMode)
                  }
                  required
                  value={values.mode}
                >
                  {SERVICE_MODES.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                error={errors.basePrice}
                htmlFor={`edit-price-${service.id}`}
                label="Base price (BDT)"
                required
              >
                <input
                  className={cn(
                    fieldControlClass,
                    "tabular",
                    errors.basePrice && "border-destructive"
                  )}
                  id={`edit-price-${service.id}`}
                  inputMode="numeric"
                  min="1"
                  onChange={(event) => update("basePrice", event.target.value)}
                  required
                  type="number"
                  value={values.basePrice}
                />
              </Field>

              <Field
                error={errors.estimatedDuration}
                htmlFor={`edit-duration-${service.id}`}
                label="Estimated duration"
                required
              >
                <input
                  className={cn(
                    fieldControlClass,
                    errors.estimatedDuration && "border-destructive"
                  )}
                  id={`edit-duration-${service.id}`}
                  onChange={(event) =>
                    update("estimatedDuration", event.target.value)
                  }
                  required
                  type="text"
                  value={values.estimatedDuration}
                />
              </Field>

              <Field
                className="sm:col-span-2"
                error={errors.area}
                htmlFor={`edit-area-${service.id}`}
                label="Service area"
                required
              >
                <input
                  className={cn(
                    fieldControlClass,
                    errors.area && "border-destructive"
                  )}
                  id={`edit-area-${service.id}`}
                  onChange={(event) => update("area", event.target.value)}
                  required
                  type="text"
                  value={values.area}
                />
              </Field>

              <Field
                className="sm:col-span-2"
                error={errors.description}
                htmlFor={`edit-description-${service.id}`}
                label="Description"
                required
              >
                <textarea
                  className={cn(
                    fieldTextareaClass,
                    errors.description && "border-destructive"
                  )}
                  id={`edit-description-${service.id}`}
                  onChange={(event) =>
                    update("description", event.target.value)
                  }
                  required
                  rows={4}
                  value={values.description}
                />
              </Field>
            </div>

            {previewed ? (
              <div
                className="mt-4 rounded-lg border border-line bg-sage/50 px-4 py-3 text-sm leading-6 text-spruce"
                role="status"
              >
                <strong className="font-semibold">Preview only.</strong> No
                changes are saved. In production, this edit would move the
                service back to Pending approval.
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-line pt-4">
              <Dialog.Close
                className={buttonVariants({ size: "sm", variant: "outline" })}
              >
                Cancel
              </Dialog.Close>
              <Button size="sm" type="submit">
                Save changes
              </Button>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
