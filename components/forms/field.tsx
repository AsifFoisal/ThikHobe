import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export const fieldControlClass =
  "h-11 w-full rounded-[0.625rem] border border-line-strong bg-paper px-3 text-sm text-ink transition-colors placeholder:text-muted-ink focus-visible:border-fern focus-visible:ring-2 focus-visible:ring-fern/20 focus-visible:outline-none aria-invalid:border-destructive"

export const fieldTextareaClass = cn(
  fieldControlClass,
  "h-auto min-h-32 resize-y py-3 leading-6"
)

interface FieldProps {
  label: string
  htmlFor: string
  hint?: string
  error?: string
  required?: boolean
  children: ReactNode
  className?: string
}

export function Field({
  label,
  htmlFor,
  hint,
  error,
  required = false,
  children,
  className,
}: FieldProps) {
  return (
    <div className={className}>
      <label
        className="text-[0.8125rem] font-medium text-ink"
        htmlFor={htmlFor}
      >
        {label}
        {required ? (
          <span aria-hidden className="text-fern">
            {" "}
            *
          </span>
        ) : null}
      </label>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p
          className="mt-1.5 text-xs leading-5 font-medium text-status-red"
          id={`${htmlFor}-error`}
        >
          {error}
        </p>
      ) : hint ? (
        <p
          className="mt-1.5 text-xs leading-5 text-muted-ink"
          id={`${htmlFor}-hint`}
        >
          {hint}
        </p>
      ) : null}
    </div>
  )
}
