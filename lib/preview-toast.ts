import { toast } from "sonner"

/**
 * One honest notification channel for actions that are presentation previews.
 * The shared id prevents stacked duplicates when several previews are clicked.
 */
export function previewToast(
  description = "No records were changed."
) {
  toast.info("Preview only", {
    description,
    id: "fixmate-preview",
    duration: 3800,
  })
}
