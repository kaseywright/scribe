import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/clsx";

const buttonVariants = cva(
  "inline-flex items-center rounded-lg text-[var(--theia-settings-textInputForeground)]  text-xs justify-center whitespace-nowrap rounded-md font-normal transition-colors focus:outline-none gap-[5px]   disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--theia-secondaryButton-foreground)]  hover:bg-[var(--theia-button-hoverBackground)]",
        destructive: "bg-destructive hover:bg-destructive/90",
        outline:
          "border border-[var(rgba(66, 66, 71, 0.8))]  bg-[var(--theia-editor-background)] ",
        secondary: "bg-secondary hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 px-2 py-2.5",
        sm: "h-7 rounded-md px-3",
        lg: "h-9 rounded-md px-8",
        icon: "px-[5px] py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Buttons = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Buttons.displayName = "Buttons";

export { Buttons, buttonVariants };
