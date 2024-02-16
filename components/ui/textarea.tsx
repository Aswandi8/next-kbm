"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { useStateContext } from "@/context/ContextProvider";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const { currentColor } = useStateContext();
    return (
      <textarea
        style={{ border: `1px solid ${currentColor}` }}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background/30 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ",
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
