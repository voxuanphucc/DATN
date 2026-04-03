import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const inputVariants = cva(
  "font-roboto outline-none transition-all duration-200 placeholder:text-[#A89870] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-input bg-transparent px-3 rounded-lg focus:border-ring focus:ring-2 focus:ring-ring/30",
        primary:
          "border border-[#D4C9A8] bg-[#FDFAF3] px-4 rounded-2xl text-[#2D3A1E] focus:border-green-500 focus:ring-2 focus:ring-green-500/20",
      },
      size: {
        sm: "h-9 text-[13px]",
        md: "h-11 text-[14px]",
        lg: "h-13 text-[15px]",
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

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, fullWidth, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(inputVariants({ variant, size, fullWidth, className }))}
      {...props}
    />
  )
);

Input.displayName = "Input";

export { Input };
export type { InputProps };
