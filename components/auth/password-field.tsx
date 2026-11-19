"use client"

import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import type { UseFormRegisterReturn } from "react-hook-form"

import { Field, fieldControlClass } from "@/components/forms/field"
import { cn } from "@/lib/utils"

interface PasswordFieldProps {
  id: string
  label: string
  error?: string
  hint?: string
  registration: UseFormRegisterReturn
  autoComplete: string
}

export function PasswordField({
  id,
  label,
  error,
  hint,
  registration,
  autoComplete,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)

  return (
    <Field error={error} hint={hint} htmlFor={id} label={label} required>
      <div className="relative">
        <input
          {...registration}
          aria-describedby={
            error ? `${id}-error` : hint ? `${id}-hint` : undefined
          }
          aria-invalid={Boolean(error)}
          aria-required="true"
          autoComplete={autoComplete}
          className={cn(
            fieldControlClass,
            "pr-11",
            error && "border-destructive"
          )}
          id={id}
          required
          type={visible ? "text" : "password"}
        />
        <button
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute top-1/2 right-1.5 grid size-8 -translate-y-1/2 place-items-center rounded-md text-muted-ink transition-colors hover:bg-sage hover:text-spruce focus-visible:ring-2 focus-visible:ring-fern focus-visible:outline-none"
          onClick={() => setVisible((current) => !current)}
          type="button"
        >
          {visible ? (
            <EyeOff aria-hidden className="size-4" />
          ) : (
            <Eye aria-hidden className="size-4" />
          )}
        </button>
      </div>
    </Field>
  )
}
