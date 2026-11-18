import { cn } from "@/lib/utils"

const sizes = {
  sm: "size-8 text-[0.6875rem]",
  md: "size-10 text-xs",
  lg: "size-14 text-base",
} as const

interface AvatarProps {
  name: string
  src?: string
  size?: keyof typeof sizes
  className?: string
}

function getInitials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase() || "?"
  )
}

export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  return (
    <span
      className={cn(
        "relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full bg-sage font-semibold text-spruce ring-1 ring-spruce/10",
        sizes[size],
        className
      )}
    >
      <span aria-hidden>{getInitials(name)}</span>
      {src ? (
        <span
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${JSON.stringify(src)})` }}
        />
      ) : null}
    </span>
  )
}
