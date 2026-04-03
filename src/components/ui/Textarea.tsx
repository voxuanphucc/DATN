import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const textareaVariants = cva(
  "font-roboto outline-none transition-all duration-200 resize-none placeholder:text-[#A89870] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-input bg-transparent px-3 py-2 rounded-lg focus:border-ring focus:ring-2 focus:ring-ring/30",
        primary:
          "border border-[#D4C9A8] bg-[#FDFAF3] px-4 py-3 rounded-2xl text-[#2D3A1E] focus:border-green-500 focus:ring-2 focus:ring-green-500/20",
      },
      size: {
        sm: "text-[13px]",
        md: "text-[14px]",
        lg: "text-[15px]",
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

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, fullWidth, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(textareaVariants({ variant, size, fullWidth, className }))}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";

export { Textarea };
export type { TextareaProps };
