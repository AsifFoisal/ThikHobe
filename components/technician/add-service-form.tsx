"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronDown, LockKeyhole } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import {
  Field,
  fieldControlClass,
  fieldTextareaClass,
} from "@/components/forms/field"
import { ServiceImageField } from "@/components/technician/service-image-field"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SERVICE_CATEGORIES, SERVICE_MODES } from "@/constants"
import { ApiError, servicesApi } from "@/lib/api"
import { uploadImage } from "@/lib/upload"
import { cn } from "@/lib/utils"
import type { SessionUser } from "@/types"

const serviceSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Use at least 5 characters.")
    .max(100, "Keep the title under 100 characters."),
  category: z.enum(SERVICE_CATEGORIES),
  description: z
    .string()
    .trim()
    .min(40, "Describe the service in at least 40 characters.")
    .max(600, "Keep the description under 600 characters."),
  basePrice: z
    .string()
    .trim()
    .min(1, "Enter a base price.")
    .refine((value) => Number(value) > 0, "Base price must be greater than zero.")
    .refine(
      (value) => Number(value) <= 500000,
      "Keep the base price under $500,000."
    ),
  estimatedDuration: z
    .string()
    .trim()
    .min(3, "Enter an estimated duration.")
    .max(40, "Keep the duration under 40 characters."),
  mode: z.enum(SERVICE_MODES),
  area: z
    .string()
    .trim()
    .min(3, "Enter the service area.")
    .max(60, "Keep the area under 60 characters."),
  image: z.string().min(1, "Choose a service image."),
})

type ServiceValues = z.infer<typeof serviceSchema>

export function AddServiceForm({ technician }: { technician: SessionUser }) {
  const router = useRouter()
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [pending, setPending] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      category: "Smartphone",
      description: "",
      basePrice: "",
      estimatedDuration: "",
      mode: "Home Visit",
      area: "Dhanmondi",
      image: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  })

  const setImage = (file: File | null) => {
    setImageFile(file)
    setValue("image", file?.name ?? "", {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  const onSubmit = handleSubmit(async (values) => {
    if (!imageFile) {
      setServerError("Choose a service image.")
      return
    }

    setPending(true)
    setServerError(null)

    try {
      const image = await uploadImage(imageFile)
      await servicesApi.create({
        title: values.title.trim(),
        category: values.category,
        description: values.description.trim(),
        basePrice: Number(values.basePrice),
        estimatedDuration: values.estimatedDuration.trim(),
        mode: values.mode,
        area: values.area.trim(),
        image,
      })
      toast.success("Service submitted for approval")
      router.push("/dashboard/technician/my-services")
      router.refresh()
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "The service could not be created."
      setServerError(message)
      toast.error(message)
      setPending(false)
    }
  })

  return (
    <form noValidate onSubmit={onSubmit}>
      <div className="flex items-center gap-3 rounded-lg bg-paper p-3">
        <Avatar name={technician.name} size="sm" src={technician.image} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ink">
            {technician.name}
          </p>
          <p className="truncate text-xs text-muted-ink">{technician.email}</p>
        </div>
        <Badge tone="neutral">
          <LockKeyhole aria-hidden className="size-3" />
          Read only
        </Badge>
      </div>

      <fieldset className="mt-7">
        <legend className="type-h3">Service details</legend>
        <p className="mt-1 text-sm text-muted-ink">
          Describe the repair clearly enough for a customer to choose it with
          confidence.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field
            className="sm:col-span-2"
            error={errors.title?.message}
            hint="Customers see this title on service cards and search results."
            htmlFor="service-title"
            label="Title"
            required
          >
            <input
              {...register("title")}
              aria-describedby="service-title-hint"
              aria-invalid={Boolean(errors.title)}
              aria-required="true"
              className={cn(
                fieldControlClass,
                errors.title && "border-destructive"
              )}
              id="service-title"
              placeholder="e.g. iPhone Screen & Battery Replacement"
              required
              type="text"
            />
          </Field>

          <Field
            error={errors.category?.message}
            htmlFor="service-category"
            label="Category"
            required
          >
            <div className="relative">
              <select
                {...register("category")}
                aria-invalid={Boolean(errors.category)}
                aria-required="true"
                className={cn(
                  fieldControlClass,
                  "appearance-none pr-9",
                  errors.category && "border-destructive"
                )}
                id="service-category"
                required
              >
                {SERVICE_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden
                className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-ink"
              />
            </div>
          </Field>

          <Field
            error={errors.mode?.message}
            hint="Home visits or repairs at your shop."
            htmlFor="service-mode"
            label="Service mode"
            required
          >
            <div className="relative">
              <select
                {...register("mode")}
                aria-describedby="service-mode-hint"
                aria-invalid={Boolean(errors.mode)}
                aria-required="true"
                className={cn(
                  fieldControlClass,
                  "appearance-none pr-9",
                  errors.mode && "border-destructive"
                )}
                id="service-mode"
                required
              >
                {SERVICE_MODES.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden
                className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-ink"
              />
            </div>
          </Field>

          <Field
            className="sm:col-span-2"
            error={errors.description?.message}
            hint="40–600 characters. Include what is covered and any limits."
            htmlFor="service-description"
            label="Description"
            required
          >
            <textarea
              {...register("description")}
              aria-describedby="service-description-hint"
              aria-invalid={Boolean(errors.description)}
              aria-required="true"
              className={cn(
                fieldTextareaClass,
                errors.description && "border-destructive"
              )}
              id="service-description"
              placeholder="Explain the problem this service solves, what the technician checks, and what the starting price includes."
              required
              rows={5}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="mt-8 border-t border-line pt-6">
        <legend className="type-h3">Pricing and coverage</legend>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field
            error={errors.basePrice?.message}
            hint="Starting price before any additional parts."
            htmlFor="service-price"
            label="Base price (USD)"
            required
          >
            <input
              {...register("basePrice")}
              aria-describedby="service-price-hint"
              aria-invalid={Boolean(errors.basePrice)}
              aria-required="true"
              className={cn(
                fieldControlClass,
                "tabular",
                errors.basePrice && "border-destructive"
              )}
              id="service-price"
              inputMode="decimal"
              min="1"
              placeholder="120"
              required
              step="0.01"
              type="number"
            />
          </Field>

          <Field
            error={errors.estimatedDuration?.message}
            hint="A realistic range, e.g. 45–60 min."
            htmlFor="service-duration"
            label="Estimated duration"
            required
          >
            <input
              {...register("estimatedDuration")}
              aria-describedby="service-duration-hint"
              aria-invalid={Boolean(errors.estimatedDuration)}
              aria-required="true"
              className={cn(
                fieldControlClass,
                errors.estimatedDuration && "border-destructive"
              )}
              id="service-duration"
              placeholder="45–60 min"
              required
              type="text"
            />
          </Field>

          <Field
            className="sm:col-span-2"
            error={errors.area?.message}
            hint="Where you can provide this service."
            htmlFor="service-area"
            label="Service area"
            required
          >
            <input
              {...register("area")}
              aria-describedby="service-area-hint"
              aria-invalid={Boolean(errors.area)}
              aria-required="true"
              className={cn(
                fieldControlClass,
                errors.area && "border-destructive"
              )}
              id="service-area"
              placeholder="Dhanmondi, Dhaka"
              required
              type="text"
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="mt-8 border-t border-line pt-6">
        <legend className="type-h3">Service image</legend>
        <div className="mt-4">
          <ServiceImageField error={errors.image?.message} onChange={setImage} />
        </div>
      </fieldset>

      {serverError ? (
        <div
          className="mt-6 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm leading-6 text-status-red"
          role="alert"
        >
          {serverError}
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <Button disabled={pending} size="lg" type="submit">
          {pending ? "Submitting…" : "Submit for approval"}
        </Button>
        <p className="type-meta">
          New services are reviewed before they go live.
        </p>
      </div>
      <p className="mt-3 text-xs leading-5 text-muted-ink">
        The service is created with Pending approval and Availability on. An
        administrator reviews it before it appears publicly.
      </p>
    </form>
  )
}
