import * as React from "@theia/core/shared/react";

import { cn } from "../../utils/clsx";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-[20px] border  border-[rgb(250 250 250 / 0.1)] bg-[var(--theia-editor-background)] text-[var(--theia-settings-textInputForeground)] px-4 py-3 text-xs ring-offset-background placeholder:text-zinc-50 focus-visible:outline-none focus:border-cyan-500 border-[rgb(250 250 250 / 0.1)] focus-visible:ring focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
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
