"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Gold fill — primary CTA (e.g. "Get Tickets", "Join Now")
        default:
          "bg-teleiosis-gold text-teleiosis-deep hover:bg-teleiosis-gold/85 shadow-sm",
        // Deep purple fill — secondary CTA
        secondary:
          "bg-teleiosis-purple text-white hover:bg-teleiosis-purple/85 shadow-sm",
        // Outlined purple
        outline:
          "border-2 border-teleiosis-purple bg-transparent text-teleiosis-purple hover:bg-teleiosis-purple hover:text-white",
        // Outlined gold (for dark backgrounds)
        "outline-gold":
          "border-2 border-teleiosis-gold bg-transparent text-teleiosis-gold hover:bg-teleiosis-gold hover:text-teleiosis-deep",
        // Magenta accent
        accent:
          "bg-teleiosis-magenta text-white hover:bg-teleiosis-pink shadow-sm",
        // Ghost — minimal
        ghost:
          "hover:bg-teleiosis-purple/10 text-teleiosis-purple",
        // Destructive
        destructive:
          "bg-red-600 text-white hover:bg-red-600/90 shadow-sm",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm:      "h-9 rounded-md px-4 text-xs",
        lg:      "h-12 rounded-xl px-8 text-base",
        icon:    "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

import { Spinner } from "../Spinner"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }), "relative")}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner size="sm" />
          </div>
        )}
        <span className={cn(isLoading && "opacity-0")}>{children}</span>
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
