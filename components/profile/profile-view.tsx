"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import {
  Field,
  fieldControlClass,
  fieldTextareaClass,
} from "@/components/forms/field"
import { ProfilePhotoField } from "@/components/profile/profile-photo-field"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RoleBadge } from "@/components/ui/role-badge"
import { ROLE_LABELS } from "@/constants"
import { ApiError, usersApi } from "@/lib/api"
import type { SessionProfile } from "@/lib/session"
import { uploadImage } from "@/lib/upload"
import { cn } from "@/lib/utils"

const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(80, "Keep your name under 80 characters."),
  phone: z
    .string()
    .trim()
    .max(25, "Keep the phone number under 25 characters.")
    .refine((value) => {
      if (value.length === 0) return true
      if (!/^[+()\d\s-]+$/.test(value)) return false
      const digits = value.replace(/\D/g, "")
      return digits.length >= 10 && digits.length <= 15
    }, "Use a valid phone number or leave it empty."),
  area: z.string().trim().max(80, "Keep the area under 80 characters."),
  bio: z.string().trim().max(300, "Keep your bio under 300 characters."),
})

type ProfileValues = z.infer<typeof profileSchema>

export function ProfileView({ user }: { user: SessionProfile }) {
  const router = useRouter()
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [pending, setPending] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      phone: user.phone ?? "",
      area: user.area ?? "",
      bio: user.bio ?? "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  })

  useEffect(() => {
    reset({
      name: user.name,
      phone: user.phone ?? "",
      area: user.area ?? "",
      bio: user.bio ?? "",
    })
  }, [user, reset])

  const draftName = useWatch({ control, name: "name" })

  const onSubmit = handleSubmit(async (values) => {
    setPending(true)
    setServerError(null)

    try {
      const image = imageFile ? await uploadImage(imageFile) : undefined
      await usersApi.updateProfile({
        name: values.name.trim(),
        phone: values.phone.trim(),
        area: values.area.trim(),
        bio: values.bio.trim(),
        ...(image ? { image } : {}),
      })
      toast.success("Profile updated")
      setImageFile(null)
      router.refresh()
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "The profile could not be updated."
      setServerError(message)
      toast.error(message)
    } finally {
      setPending(false)
    }
  })

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="max-w-2xl">
        <h1 className="type-h1">Profile</h1>
        <p className="type-lead mt-3">
          Keep the identity and contact details attached to your FixMate
          workspace up to date.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr] xl:items-start">
        <Card className="p-5 sm:p-6 lg:p-8">
          <form noValidate onSubmit={onSubmit}>
            <ProfilePhotoField
              image={user.image}
              name={draftName || user.name}
              onChange={setImageFile}
            />

            <fieldset className="mt-7 border-t border-line pt-6">
              <legend className="type-h3">Personal details</legend>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field
                  error={errors.name?.message}
                  hint="The name shown across your workspace."
                  htmlFor="profile-name"
                  label="Name"
                  required
                >
                  <input
                    {...register("name")}
                    aria-describedby={
                      errors.name ? "profile-name-error" : "profile-name-hint"
                    }
                    aria-invalid={Boolean(errors.name)}
                    aria-required="true"
                    className={cn(
                      fieldControlClass,
                      errors.name && "border-destructive"
                    )}
                    id="profile-name"
                    placeholder="Your full name"
                    required
                    type="text"
                  />
                </Field>

                <Field
                  error={errors.phone?.message}
                  hint="Optional. Use a number customers can reach."
                  htmlFor="profile-phone"
                  label="Phone"
                >
                  <input
                    {...register("phone")}
                    aria-describedby={
                      errors.phone ? "profile-phone-error" : "profile-phone-hint"
                    }
                    aria-invalid={Boolean(errors.phone)}
                    autoComplete="tel"
                    className={cn(
                      fieldControlClass,
                      errors.phone && "border-destructive"
                    )}
                    id="profile-phone"
                    inputMode="tel"
                    placeholder="+880 1700 000 000"
                    type="tel"
                  />
                </Field>

                <Field
                  hint="Email is fixed to the authenticated account."
                  htmlFor="profile-email"
                  label="Email"
                >
                  <input
                    aria-describedby="profile-email-hint"
                    aria-readonly="true"
                    className={cn(
                      fieldControlClass,
                      "bg-sage/40 text-muted-ink"
                    )}
                    id="profile-email"
                    readOnly
                    type="email"
                    value={user.email}
                  />
                </Field>

                <Field
                  hint="Roles are managed by the platform."
                  htmlFor="profile-role"
                  label="Role"
                >
                  <input
                    aria-describedby="profile-role-hint"
                    aria-readonly="true"
                    className={cn(
                      fieldControlClass,
                      "bg-sage/40 text-muted-ink"
                    )}
                    id="profile-role"
                    readOnly
                    type="text"
                    value={ROLE_LABELS[user.role]}
                  />
                </Field>

                <Field
                  className="sm:col-span-2"
                  error={errors.area?.message}
                  hint="The area you work or receive service in."
                  htmlFor="profile-area"
                  label="Area"
                >
                  <input
                    {...register("area")}
                    aria-describedby={
                      errors.area ? "profile-area-error" : "profile-area-hint"
                    }
                    aria-invalid={Boolean(errors.area)}
                    className={cn(
                      fieldControlClass,
                      errors.area && "border-destructive"
                    )}
                    id="profile-area"
                    placeholder="Dhanmondi, Dhaka"
                    type="text"
                  />
                </Field>

                <Field
                  className="sm:col-span-2"
                  error={errors.bio?.message}
                  hint="Up to 300 characters. Keep it useful and specific."
                  htmlFor="profile-bio"
                  label="Bio"
                >
                  <textarea
                    {...register("bio")}
                    aria-describedby={
                      errors.bio ? "profile-bio-error" : "profile-bio-hint"
                    }
                    aria-invalid={Boolean(errors.bio)}
                    className={cn(
                      fieldTextareaClass,
                      errors.bio && "border-destructive"
                    )}
                    id="profile-bio"
                    placeholder="A short introduction for customers or your team."
                    rows={4}
                  />
                </Field>
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
                {pending ? "Saving…" : "Save profile"}
              </Button>
              <p className="type-meta">
                Your session refresh updates the navbar and dashboard identity.
              </p>
            </div>
          </form>
        </Card>

        <div className="space-y-6">
          <Card className="p-5 sm:p-6">
            <h2 className="type-h3">Current identity</h2>
            <p className="mt-1 text-sm leading-6 text-muted-ink">
              The authenticated account driving this workspace.
            </p>
            <div className="mt-4 flex items-center gap-3 rounded-lg bg-paper p-3">
              <Avatar name={user.name} size="md" src={user.image} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">
                  {user.name}
                </p>
                <p className="truncate text-xs text-muted-ink">{user.email}</p>
              </div>
            </div>
            <div className="mt-3">
              <RoleBadge role={user.role} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
