import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Sprout, Leaf, Wind } from "lucide-react";
import { cn } from "./utils";

const loadingFallbackVariants = cva("flex items-center justify-center", {
  variants: {
    size: {
      fullscreen: "min-h-screen",
      inline: "h-32",
      sm: "h-20",
    },
    layout: {
      vertical: "flex-col",
      horizontal: "flex-row gap-4",
    },
  },
  defaultVariants: {
    size: "fullscreen",
    layout: "vertical",
  },
});

export interface LoadingFallbackProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingFallbackVariants> {
  text?: string | React.ReactNode;
  showText?: boolean;
  /** Control visibility of the loading overlay (backward compatibility) */
  isVisible?: boolean;
}

const LoadingFallback = React.forwardRef<HTMLDivElement, LoadingFallbackProps>(
  (
    {
      size = "fullscreen",
      layout = "vertical",
      text = "Đang tải dữ liệu nông trại...",
      showText = true,
      isVisible = true,
      className = "",
      ...props
    },
    ref,
  ) => {
    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        className={cn(
          loadingFallbackVariants({ size, layout }),
          "bg-gradient-to-b from-green-50 to-emerald-50",
          className,
        )}
        {...props}
      >
        <style>{`
          @keyframes bounce-custom {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
          }
          @keyframes sway {
            0%, 100% { transform: rotate(-2deg); }
            50% { transform: rotate(2deg); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(5deg); }
          }
          .sprout-bounce {
            animation: bounce-custom 1.5s ease-in-out infinite;
          }
          .leaf-sway-1 {
            animation: sway 2s ease-in-out infinite;
            transform-origin: top center;
          }
          .leaf-sway-2 {
            animation: sway 2.5s ease-in-out infinite 0.3s;
            transform-origin: top center;
          }
          .wind-float {
            animation: float 2s ease-in-out infinite 0.6s;
          }
        `}</style>

        <div className="flex flex-col items-center gap-6">
          {/* Farm Icons Container */}
          <div className="relative w-24 h-24">
            {/* Main Sprout */}
            <div className="absolute inset-0 flex items-center justify-center sprout-bounce">
              <Sprout
                size={60}
                className="text-green-600"
                strokeWidth={1.5}
                fill="currentColor"
              />
            </div>

            {/* Left Leaf */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 leaf-sway-1">
              <Leaf
                size={32}
                className="text-emerald-500"
                strokeWidth={1.5}
                fill="currentColor"
              />
            </div>

            {/* Right Wind / Air */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 wind-float">
              <Wind size={28} className="text-green-400" strokeWidth={1.5} />
            </div>
          </div>

          {/* Text */}
          {showText && (
            <div className="text-center">
              <p className="text-lg font-semibold text-green-700 mb-1">{text}</p>
              <p className="text-sm text-green-600 animate-pulse">
                FarmerAI đang xử lý dữ liệu của bạn
              </p>
            </div>
          )}

          {/* Progress Dots */}
          <div className="flex gap-2 mt-2">
            {[0, 0.2, 0.4].map((delay, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-green-500"
                style={{
                  animation: `bounce 1.4s ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  },
);

LoadingFallback.displayName = "LoadingFallback";

// ── Alias for backward compatibility ─────────────────────────────────────────

export const LoadingPage = LoadingFallback;

export { LoadingFallback };
export default LoadingFallback;
