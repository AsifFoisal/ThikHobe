import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-[0.625rem] border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-fern focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-spruce text-paper hover:bg-spruce/90",
        secondary: "bg-sage text-spruce hover:bg-sage-strong",
        outline:
          "border-line-strong bg-card text-ink hover:border-spruce/35 hover:bg-sage/50",
        ghost: "text-ink hover:bg-sage/70",
        accent: "bg-ember text-ink hover:bg-ember/90",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/15",
        link: "text-spruce underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3 text-[0.8125rem]",
        default: "h-10 px-4",
        lg: "h-12 px-5 text-[0.9375rem]",
        icon: "size-10",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
