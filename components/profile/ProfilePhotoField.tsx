"use client"

import { ImagePlus, X } from "lucide-react"
import { useEffect, useState } from "react"

import { Avatar } from "@/components/ui/Avatar"

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"]

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function ProfilePhotoField({
  name,
  image,
  onChange,
}: {
  name: string
  image?: string
  onChange: (file: File | null) => void
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [fileSize, setFileSize] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const reset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    setFileName(null)
    setFileSize(null)
  }

  const handleFile = (file: File | undefined) => {
    if (!file) return

    if (!ACCEPTED_TYPES.includes(file.type)) {
      reset()
      setError("Choose a JPEG, PNG, or WebP image.")
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      reset()
      setError("Choose an image smaller than 5 MB.")
      return
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl)

    setError(null)
    setFileName(file.name)
    setFileSize(file.size)
    setPreviewUrl(URL.createObjectURL(file))
    onChange(file)
  }

  const clear = () => {
    reset()
    setError(null)
    onChange(null)
  }

  const input = (
    <input
      accept="image/jpeg,image/png,image/webp"
      aria-describedby={error ? "profile-photo-error" : "profile-photo-hint"}
      aria-invalid={Boolean(error)}
      className="sr-only"
      id="profile-photo"
      onChange={(event) => handleFile(event.target.files?.[0])}
      type="file"
    />
  )

  return (
    <div>
      <p className="text-[0.8125rem] font-medium text-ink">Profile photo</p>
      <div className="mt-2 flex items-center gap-4">
        <Avatar
          className="size-20 text-lg"
          name={name}
          size="lg"
          src={previewUrl ?? image}
        />

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <label
              className="inline-flex cursor-pointer items-center gap-2 rounded-[0.625rem] border border-line-strong bg-card px-3 py-2 text-[0.8125rem] font-semibold text-ink transition-colors hover:border-spruce/35 hover:bg-sage/50 focus-within:ring-2 focus-within:ring-fern focus-within:ring-offset-2 focus-within:ring-offset-card"
              htmlFor="profile-photo"
            >
              {input}
              <ImagePlus aria-hidden className="size-4" />
              {previewUrl ? "Replace photo" : "Choose photo"}
            </label>
            {previewUrl ? (
              <button
                className="inline-flex items-center gap-1.5 rounded-[0.625rem] px-2 py-2 text-[0.8125rem] font-medium text-muted-ink transition-colors hover:bg-sage/50 hover:text-spruce focus-visible:ring-2 focus-visible:ring-fern focus-visible:outline-none"
                onClick={clear}
                type="button"
              >
                <X aria-hidden className="size-4" />
                Remove
              </button>
            ) : null}
          </div>

          {previewUrl && fileName ? (
            <p
              className="mt-2 truncate text-xs text-muted-ink"
              id="profile-photo-hint"
            >
              {fileName}
              {fileSize ? ` · ${formatFileSize(fileSize)}` : ""}
            </p>
          ) : (
            <p
              className="mt-2 text-xs leading-5 text-muted-ink"
              id="profile-photo-hint"
            >
              JPEG, PNG, or WebP · 5 MB maximum.
            </p>
          )}
        </div>
      </div>

      {previewUrl ? (
        <p className="mt-3 text-xs leading-5 text-muted-ink">
          Preview ready. The image uploads when you save the profile.
        </p>
      ) : null}

      {error ? (
        <p
          className="mt-2 text-xs leading-5 font-medium text-status-red"
          id="profile-photo-error"
        >
          {error}
        </p>
      ) : null}
    </div>
  )
}
