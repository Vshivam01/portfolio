import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg) disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-(--color-accent) text-(--color-accent-fg) hover:brightness-110 hover:shadow-lg hover:shadow-(--color-accent)/20",
        outline:
          "border border-(--color-border) bg-transparent text-(--color-text) hover:bg-(--color-surface) hover:border-(--color-text)/30",
        ghost:
          "bg-transparent text-(--color-text) hover:bg-(--color-surface)",
      },
      size: {
        sm: "h-10 px-4 text-sm min-h-[44px]",
        md: "h-12 px-6 text-base min-h-[44px]",
        lg: "h-14 px-8 text-lg min-h-[48px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { buttonVariants };
