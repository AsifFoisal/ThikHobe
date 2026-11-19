"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, UserRound, Wrench } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { PasswordField } from "@/components/auth/password-field"
import { Field, fieldControlClass } from "@/components/forms/field"
import { Button } from "@/components/ui/button"
import { ROLE_DASHBOARD } from "@/constants"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

const signUpSchema = z.object({
  name: z.string().trim().min(1, "Full name is required."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(6, "Use at least 6 characters.")
    .regex(/[A-Z]/, "Include at least one uppercase letter.")
    .regex(/[a-z]/, "Include at least one lowercase letter."),
  role: z.enum(["customer", "technician"]),
})

type SignUpValues = z.infer<typeof signUpSchema>

const accountTypes = [
  {
    value: "customer",
    label: "Customer",
    description: "Book repairs and follow progress.",
    icon: UserRound,
  },
  {
    value: "technician",
    label: "Technician",
    description: "List services and manage requests.",
    icon: Wrench,
  },
] as const

export function SignUpForm({ redirectTo }: { redirectTo: string | null }) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "customer",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  })

  const role = useWatch({ control, name: "role" })
  const signInHref = redirectTo
    ? `/sign-in?redirect=${encodeURIComponent(redirectTo)}`
    : "/sign-in"

  const onSubmit = handleSubmit(async (values) => {
    setSubmitting(true)
    setServerError(null)

    const { error } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      role: values.role,
    })

    if (error) {
      const message = error.message || "Could not create your account."
      setServerError(message)
      toast.error(message)
      setSubmitting(false)
      return
    }

    const destination =
      redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")
        ? redirectTo
        : ROLE_DASHBOARD[values.role]

    toast.success("Account created")
    router.push(destination)
    router.refresh()
  })

  return (
    <div className="w-full max-w-[26rem]">
      <h1 className="type-h1">Create your account.</h1>
      <p className="mt-3 text-sm leading-6 text-muted-ink">
        Book repairs, follow the work, and keep the payment until the job is
        done.
      </p>

      {redirectTo ? (
        <div className="mt-5 flex items-start gap-2 rounded-lg border border-line bg-sage/40 p-3 text-sm leading-6 text-spruce">
          <ArrowRight aria-hidden className="mt-0.5 size-4 shrink-0" />
          <span>
            Create an account to continue to the page you were viewing.
          </span>
        </div>
      ) : null}

      <form className="mt-7" noValidate onSubmit={onSubmit}>
        <div className="space-y-4">
          <Field
            error={errors.name?.message}
            htmlFor="signup-name"
            label="Full name"
            required
          >
            <input
              {...register("name")}
              aria-describedby={errors.name ? "signup-name-error" : undefined}
              aria-invalid={Boolean(errors.name)}
              aria-required="true"
              autoComplete="name"
              className={cn(
                fieldControlClass,
                errors.name && "border-destructive"
              )}
              id="signup-name"
              placeholder="Arif Rahman"
              required
              type="text"
            />
          </Field>

          <Field
            error={errors.email?.message}
            htmlFor="signup-email"
            label="Email"
            required
          >
            <input
              {...register("email")}
              aria-describedby={errors.email ? "signup-email-error" : undefined}
              aria-invalid={Boolean(errors.email)}
              aria-required="true"
              autoComplete="email"
              className={cn(
                fieldControlClass,
                errors.email && "border-destructive"
              )}
              id="signup-email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </Field>

          <PasswordField
            autoComplete="new-password"
            error={errors.password?.message}
            hint="At least 6 characters, with one uppercase and one lowercase letter."
            id="signup-password"
            label="Password"
            registration={register("password")}
          />

          <fieldset>
            <legend className="text-[0.8125rem] font-medium text-ink">
              Account type
              <span aria-hidden className="text-fern">
                {" "}
                *
              </span>
            </legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {accountTypes.map((accountType) => {
                const Icon = accountType.icon
                const selected = role === accountType.value
                return (
                  <label
                    className={cn(
                      "flex cursor-pointer flex-col gap-2 rounded-xl border p-3.5 transition-colors focus-within:ring-2 focus-within:ring-fern focus-within:ring-offset-2 focus-within:ring-offset-paper",
                      selected
                        ? "border-spruce bg-sage/50"
                        : "border-line bg-card hover:border-line-strong hover:bg-sage/20"
                    )}
                    key={accountType.value}
                  >
                    <input
                      {...register("role")}
                      className="sr-only"
                      type="radio"
                      value={accountType.value}
                    />
                    <span className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "grid size-8 place-items-center rounded-[0.5rem]",
                          selected
                            ? "bg-spruce text-paper"
                            : "bg-sage text-spruce"
                        )}
                      >
                        <Icon aria-hidden className="size-4" />
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "relative size-4 rounded-full border",
                          selected ? "border-spruce" : "border-muted-ink"
                        )}
                      >
                        {selected ? (
                          <span className="absolute inset-1 rounded-full bg-spruce" />
                        ) : null}
                      </span>
                    </span>
                    <span className="text-sm font-semibold text-ink">
                      {accountType.label}
                    </span>
                    <span className="text-xs leading-5 text-muted-ink">
                      {accountType.description}
                    </span>
                  </label>
                )
              })}
            </div>
            <p className="mt-1.5 text-xs leading-5 text-muted-ink">
              Admin accounts are managed internally.
            </p>
          </fieldset>
        </div>

        {serverError ? (
          <div
            className="mt-5 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm leading-6 text-status-red"
            role="alert"
          >
            {serverError}
          </div>
        ) : null}

        <Button
          className="mt-6 w-full"
          disabled={submitting}
          size="lg"
          type="submit"
        >
          {submitting ? "Creating account…" : "Create account"}
        </Button>
        <p className="mt-3 text-xs leading-5 text-muted-ink">
          Your password is hashed by Better Auth. Admin accounts are created
          internally.
        </p>
      </form>

      <p className="mt-6 border-t border-line pt-5 text-sm text-muted-ink">
        Already have an account?{" "}
        <Link
          className="font-semibold text-spruce underline-offset-4 hover:underline"
          href={signInHref}
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}
