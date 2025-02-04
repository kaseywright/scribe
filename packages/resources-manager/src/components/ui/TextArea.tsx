import * as React from "react";

import { cn } from "../../utils/clsx";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-[20px] border dark:border-zinc-900 border-zinc-200 dark:text-zinc-50 text-zinc-700 bg-[var(--theia-secondaryButton-foreground)] px-4 py-3 text-xs ring-offset-background dark:placeholder:text-zinc-50 placeholder:text-zinc-600 focus-visible:outline-none focus:border-cyan-500 focus-visible:ring focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
