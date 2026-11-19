"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Field,
  fieldControlClass,
  fieldTextareaClass,
} from "@/components/forms/field"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { SessionUser } from "@/types"

const repairRequestSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  email: z.email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required.")
    .regex(/^[+()\d\s-]+$/, "Use digits, spaces, +, -, or parentheses.")
    .refine((value) => {
      const digits = value.replace(/\D/g, "")
      return digits.length >= 10 && digits.length <= 15
    }, "Enter a valid phone number."),
  address: z.string().trim().min(10, "Enter your full service address."),
  preferredDate: z
    .string()
    .min(1, "Choose a preferred date.")
    .refine((value) => {
      const date = new Date(`${value}T00:00:00`)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return !Number.isNaN(date.getTime()) && date >= today
    }, "Choose today or a future date."),
  problemDescription: z
    .string()
    .trim()
    .min(20, "Describe the problem in at least 20 characters.")
    .max(600, "Keep the description under 600 characters."),
})

type RepairRequestValues = z.infer<typeof repairRequestSchema>

function getTodayInputValue() {
  const today = new Date()
  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-")
}

export function RepairRequestForm({ viewer }: { viewer: SessionUser }) {
  const [previewed, setPreviewed] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RepairRequestValues>({
    resolver: zodResolver(repairRequestSchema),
    defaultValues: {
      name: viewer.name,
      email: viewer.email,
      phone: "",
      address: "",
      preferredDate: "",
      problemDescription: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  })

  const minDate = getTodayInputValue()

  return (
    <form
      className="mt-6"
      noValidate
      onSubmit={handleSubmit(
        () => setPreviewed(true),
        () => setPreviewed(false)
      )}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          hint="From your account."
          htmlFor="request-name"
          label="Name"
          required
        >
          <input
            {...register("name")}
            aria-describedby="request-name-hint"
            aria-readonly="true"
            aria-required="true"
            className={cn(fieldControlClass, "bg-sage/40 text-muted-ink")}
            id="request-name"
            readOnly
            type="text"
          />
        </Field>

        <Field
          hint="From your account."
          htmlFor="request-email"
          label="Email"
          required
        >
          <input
            {...register("email")}
            aria-describedby="request-email-hint"
            aria-readonly="true"
            aria-required="true"
            className={cn(fieldControlClass, "bg-sage/40 text-muted-ink")}
            id="request-email"
            readOnly
            type="email"
          />
        </Field>

        <Field
          error={errors.phone?.message}
          hint="A number the technician can reach you on."
          htmlFor="request-phone"
          label="Phone number"
          required
        >
          <input
            {...register("phone")}
            aria-describedby={
              errors.phone ? "request-phone-error" : "request-phone-hint"
            }
            aria-invalid={Boolean(errors.phone)}
            aria-required="true"
            autoComplete="tel"
            className={cn(
              fieldControlClass,
              errors.phone && "border-destructive"
            )}
            id="request-phone"
            inputMode="tel"
            placeholder="+880 1700 000 000"
            required
            type="tel"
          />
        </Field>

        <Field
          error={errors.preferredDate?.message}
          hint="Today or a later date."
          htmlFor="request-date"
          label="Preferred date"
          required
        >
          <input
            {...register("preferredDate")}
            aria-describedby={
              errors.preferredDate ? "request-date-error" : "request-date-hint"
            }
            aria-invalid={Boolean(errors.preferredDate)}
            aria-required="true"
            className={cn(
              fieldControlClass,
              errors.preferredDate && "border-destructive"
            )}
            id="request-date"
            min={minDate}
            required
            type="date"
          />
        </Field>

        <Field
          className="sm:col-span-2"
          error={errors.address?.message}
          hint="Flat, house, road, and area."
          htmlFor="request-address"
          label="Service address"
          required
        >
          <input
            {...register("address")}
            aria-describedby={
              errors.address ? "request-address-error" : "request-address-hint"
            }
            aria-invalid={Boolean(errors.address)}
            aria-required="true"
            autoComplete="street-address"
            className={cn(
              fieldControlClass,
              errors.address && "border-destructive"
            )}
            id="request-address"
            placeholder="Flat 4B, House 12, Road 7, Dhanmondi"
            required
            type="text"
          />
        </Field>

        <Field
          className="sm:col-span-2"
          error={errors.problemDescription?.message}
          hint="At least 20 characters. Include what changed and when it started."
          htmlFor="request-problem"
          label="Problem description"
          required
        >
          <textarea
            {...register("problemDescription")}
            aria-describedby={
              errors.problemDescription
                ? "request-problem-error"
                : "request-problem-hint"
            }
            aria-invalid={Boolean(errors.problemDescription)}
            aria-required="true"
            className={cn(
              fieldTextareaClass,
              errors.problemDescription && "border-destructive"
            )}
            id="request-problem"
            placeholder="The screen cracked after a drop and the touch no longer works near the top edge."
            required
            rows={5}
          />
        </Field>
      </div>

      {previewed ? (
        <div
          className="mt-5 rounded-lg border border-line bg-sage/60 px-4 py-3 text-sm leading-6 text-spruce"
          role="status"
        >
          <strong className="font-semibold">Details validated.</strong> This
          front-end prototype does not send repair requests to a backend. No
          booking has been created.
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <Button size="lg" type="submit">
          Send repair request
        </Button>
        <p className="type-meta">No payment is collected with this request.</p>
      </div>

      <p className="mt-3 text-xs leading-5 text-muted-ink">
        Preview only — submitting validates the form but does not create a
        booking.
      </p>
    </form>
  )
}
