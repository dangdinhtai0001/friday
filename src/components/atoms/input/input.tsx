import * as React from "react";

import { cn } from "@/composables/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      // className={cn(
      //   "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-4 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      //   "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
      //   "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      //   className
      // )}
      className={cn(
        "rounded-8 px-2 py-1 border-[0.5px] border-black-10 bg-background-5 typography-regular-14 text-black-100",
        "hover:border-black-40",
        "disabled:text-black-20 disabled:bg-black-5 disabled:border-black-5 disabled:cursor-not-allowed",
        "focus:ring-2 focus:outline-none focus:ring-black-10 focus:ring-offset-0",
        className
      )}
      {...props}
    />
  );
}

export default Input;
