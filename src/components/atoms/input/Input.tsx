import * as React from "react";

import { cn } from "@/composables/utils/shadcn";
import { inputVariants } from "./variants";
import { VariantProps } from "class-variance-authority";

export type InputProps = Omit<
  React.ComponentProps<"input">,
  "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"
> &
  VariantProps<typeof inputVariants> & {
    asChild?: boolean;
  };

function Input({ className, type, size, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      {...props}
      className={cn(inputVariants({ size, className }))}
    />
  );
}

export default Input;
