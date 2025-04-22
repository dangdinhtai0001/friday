import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/composables/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-8 gap-4 disabled:pointer-events-none disabled:opacity-50 transition-colors cursor-pointer disabled:cursor-not-allowed typography-regular-14",
  {
    variants: {
      variant: {
        outline:
          "border-[1px] border-input border-black-10 hover:bg-black-5 hover:border-black-20",
        ghost: "hover:bg-black-5",
        solid: "bg-black-10",
        primary:
          "bg-primary-brand text-white-100 hover:bg-gradient-to-t hover:from-primary-brand hover:to-white-40",
      },
      size: {
        default: "h-28 px-8 py-4",
        icon: "h-28 w-28 px-4 py-4",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
