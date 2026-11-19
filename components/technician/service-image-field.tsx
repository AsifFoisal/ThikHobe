"use client"

import { ImagePlus, X } from "lucide-react"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"]

interface ServiceImageFieldProps {
  error?: string
  onChange: (file: File | null) => void
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function ServiceImageField({
  error,
  onChange,
}: ServiceImageFieldProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [fileSize, setFileSize] = useState<number | null>(null)
  const [localError, setLocalError] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const resetSelection = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    setFileName(null)
    setFileSize(null)
    onChange(null)
  }

  const clearImage = () => {
    resetSelection()
    setLocalError(null)
  }

  const handleFile = (file: File | undefined) => {
    if (!file) return

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setLocalError("Choose a JPEG, PNG, or WebP image.")
      resetSelection()
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setLocalError("Choose an image smaller than 5 MB.")
      resetSelection()
      return
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl)

    setLocalError(null)
    setFileName(file.name)
    setFileSize(file.size)
    setPreviewUrl(URL.createObjectURL(file))
    onChange(file)
  }

  const displayError = localError ?? error
  const inputProps = {
    "aria-describedby": displayError
      ? "service-image-error"
      : "service-image-hint",
    "aria-invalid": Boolean(displayError),
    "aria-required": true,
    accept: "image/jpeg,image/png,image/webp",
    id: "service-image",
    onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
      handleFile(event.target.files?.[0]),
    type: "file" as const,
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label
          className="text-[0.8125rem] font-medium text-ink"
          htmlFor="service-image"
        >
          Image file
          <span aria-hidden className="text-fern">
            {" "}
            *
          </span>
        </label>
        <span className="text-[11px] text-muted-ink">Up to 5 MB</span>
      </div>

      {previewUrl ? (
        <div className="mt-2 overflow-hidden rounded-[0.625rem] border border-line bg-sage">
          <div
            aria-label="Selected service image preview"
            className="aspect-[16/9] w-full bg-cover bg-center"
            role="img"
            style={{ backgroundImage: `url(${previewUrl})` }}
          />
          <div className="flex items-center justify-between gap-3 bg-card px-3 py-2">
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-ink">{fileName}</p>
              {fileSize ? (
                <p className="mt-0.5 text-[11px] text-muted-ink">
                  {formatFileSize(fileSize)}
                </p>
              ) : null}
            </div>
            <button
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-ink transition-colors hover:bg-sage hover:text-spruce focus-visible:ring-2 focus-visible:ring-fern focus-visible:outline-none"
              onClick={clearImage}
              type="button"
            >
              <X aria-hidden className="size-4" />
              <span className="sr-only">Remove selected image</span>
            </button>
          </div>
        </div>
      ) : (
        <label
          className={cn(
            "mt-2 flex cursor-pointer flex-col items-center justify-center rounded-[0.625rem] border border-dashed border-line-strong bg-paper px-4 py-8 text-center transition-colors hover:border-fern hover:bg-sage/30 focus-within:border-fern focus-within:ring-2 focus-within:ring-fern/20",
            displayError && "border-destructive"
          )}
          htmlFor="service-image"
        >
          <input className="sr-only" {...inputProps} />
          <span className="grid size-11 place-items-center rounded-full bg-sage text-spruce">
            <ImagePlus aria-hidden className="size-5" strokeWidth={1.8} />
          </span>
          <span className="mt-3 text-sm font-medium text-ink">
            Choose a service image
          </span>
          <span className="mt-1 text-xs text-muted-ink">
            JPEG, PNG, or WebP · 5 MB maximum
          </span>
        </label>
      )}

      {previewUrl ? (
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-muted-ink" id="service-image-hint">
            Local preview ready. ImgBB upload is not connected in this
            prototype.
          </p>
          <label
            className="cursor-pointer rounded-md text-xs font-semibold text-fern transition-colors hover:text-spruce focus-within:ring-2 focus-within:ring-fern focus-within:outline-none"
            htmlFor="service-image"
          >
            <input className="sr-only" {...inputProps} />
            Replace image
          </label>
        </div>
      ) : (
        <p
          className="mt-1.5 text-xs leading-5 text-muted-ink"
          id="service-image-hint"
        >
          A clear photo helps customers recognise the service. File selection
          and preview work locally; no upload is sent.
        </p>
      )}

      {displayError ? (
        <p
          className="mt-1.5 text-xs leading-5 font-medium text-status-red"
          id="service-image-error"
        >
          {displayError}
        </p>
      ) : null}
    </div>
  )
}
