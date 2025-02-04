import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/clsx";

const badgeVariants = cva(
  "inline-flex items-center justify-center tracking-wider font-bold transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent border rounded-full px-2 py-[5px] uppercase text-[8px] dark:bg-primary bg-primary text-foreground",
        secondary:
          "h-4 w-4 text-[8px] rounded-full tracking-wider bg-primary text-foreground",
        destructive:
          "border-destructive bg-[var(--theia-statusBarItem-errorForeground)] dark:bg-destructive border text-destructive-foreground rounded-lg px-[6px] py-1 text-[10px]",
        "destructive-clear-bg":
          "border rounded-lg px-[6px] py-1 text-[10px] bg-transparent border-muted",
        outline: "text-foreground border border-muted",
        rounded:
        "h-[22px] w-[22px] border  hover:bg-cyan-800 bg-[var(--theia-statusBarItem-errorForeground)]  text-cyan-700 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
