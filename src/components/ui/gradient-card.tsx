import * as React from "react"
import { cn } from "@/lib/utils"

export interface GradientCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "neon"
  children: React.ReactNode
}

const GradientCard = React.forwardRef<HTMLDivElement, GradientCardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-card text-card-foreground border border-border rounded-lg shadow-lg",
      glass: "glass rounded-xl backdrop-blur-xl",
      neon: "glass rounded-xl neon-glow backdrop-blur-xl border-primary/20"
    }

    return (
      <div
        ref={ref}
        className={cn(
          "p-6 transition-all duration-300 hover:scale-105",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
GradientCard.displayName = "GradientCard"

export { GradientCard }