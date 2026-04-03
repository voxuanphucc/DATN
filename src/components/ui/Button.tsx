import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 font-roboto font-semibold whitespace-nowrap transition-all duration-200 outline-none select-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border border-border bg-background hover:bg-muted hover:text-foreground",
        "outline-dark":
          "border border-[#2D3A1E] bg-transparent text-[#2D3A1E] hover:bg-[#2D3A1E] hover:text-white transition-all duration-200",
        "outline-yellow":
          "border border-[#FDFFDD] bg-transparent text-[#FDFFDD] hover:bg-[#FDFFDD] hover:text-[#2D3A1E] transition-all duration-200",
        ghost: "hover:bg-muted hover:text-foreground",
        "cta-yellow":
          "bg-[#E8C840] text-[#2D3A1E] hover:bg-[#F5D855] hover:shadow-lg hover:shadow-yellow-400/30 active:scale-[0.98]",
        "cta-green":
          "bg-green-700 text-white hover:bg-green-600 hover:shadow-lg hover:shadow-green-700/30 active:scale-[0.98]",
      },
      size: {
        sm: "h-9 px-4 text-[13px] rounded-xl",
        md: "h-11 px-6 text-[15px] rounded-2xl",
        lg: "h-14 px-8 text-[16px] rounded-2xl",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      fullWidth: false,
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      {...props}
    />
  )
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
