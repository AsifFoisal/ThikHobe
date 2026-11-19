import { Badge } from "@/components/ui/Badge"
import { ROLE_BADGE_TONES, ROLE_LABELS } from "@/constants"
import { cn } from "@/lib/utils"
import type { UserRole } from "@/types"

export function RoleBadge({
  role,
  className,
}: {
  role: UserRole
  className?: string
}) {
  return (
    <Badge
      tone={ROLE_BADGE_TONES[role]}
      className={cn("px-2 py-0.5 text-[0.6875rem]", className)}
    >
      {ROLE_LABELS[role]}
    </Badge>
  )
}
