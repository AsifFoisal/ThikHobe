"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { PasswordField } from "@/components/auth/password-field"
import { Field, fieldControlClass } from "@/components/forms/field"
import { Button } from "@/components/ui/button"
import { ROLE_DASHBOARD } from "@/constants"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
})

type SignInValues = z.infer<typeof signInSchema>

export function SignInForm({ redirectTo }: { redirectTo: string | null }) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
    reValidateMode: "onChange",
  })

  const signUpHref = redirectTo
    ? `/sign-up?redirect=${encodeURIComponent(redirectTo)}`
    : "/sign-up"

  const onSubmit = handleSubmit(async (values) => {
    setSubmitting(true)
    setServerError(null)

    const { data, error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    })

    if (error) {
      const message = error.message || "Invalid email or password."
      setServerError(message)
      toast.error(message)
      setSubmitting(false)
      return
    }

    const role = data?.user?.role
    const destination =
      redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")
        ? redirectTo
        : ROLE_DASHBOARD[
            role === "technician" || role === "admin" ? role : "customer"
          ]

    toast.success("Signed in")
    router.push(destination)
    router.refresh()
  })

  return (
    <div className="w-full max-w-[26rem]">
      <h1 className="type-h1">Welcome back.</h1>
      <p className="mt-3 text-sm leading-6 text-muted-ink">
        Sign in to follow your repairs, check their status, and pay after the
        work is done.
      </p>

      {redirectTo ? (
        <div className="mt-5 flex items-start gap-2 rounded-lg border border-line bg-sage/40 p-3 text-sm leading-6 text-spruce">
          <ArrowRight aria-hidden className="mt-0.5 size-4 shrink-0" />
          <span>
            After signing in, you&apos;ll return to the page you were viewing.
          </span>
        </div>
      ) : null}

      <form className="mt-7" noValidate onSubmit={onSubmit}>
        <div className="space-y-4">
          <Field
            error={errors.email?.message}
            htmlFor="signin-email"
            label="Email"
            required
          >
            <input
              {...register("email")}
              aria-describedby={errors.email ? "signin-email-error" : undefined}
              aria-invalid={Boolean(errors.email)}
              aria-required="true"
              autoComplete="email"
              className={cn(
                fieldControlClass,
                errors.email && "border-destructive"
              )}
              id="signin-email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </Field>

          <PasswordField
            autoComplete="current-password"
            error={errors.password?.message}
            id="signin-password"
            label="Password"
            registration={register("password")}
          />
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
          {submitting ? "Signing in…" : "Sign in"}
        </Button>
        <p className="mt-3 text-xs leading-5 text-muted-ink">
          Sessions are managed by Better Auth.
        </p>
      </form>

      <p className="mt-6 border-t border-line pt-5 text-sm text-muted-ink">
        New to FixMate?{" "}
        <Link
          className="font-semibold text-spruce underline-offset-4 hover:underline"
          href={signUpHref}
        >
          Create an account
        </Link>
      </p>
    </div>
  )
}
