import * as React from "react";
import { type VariantProps } from "class-variance-authority";
// Define the Props type for the Button component
export type ButtonProps = React.ComponentProps<"button"> & // Standard button props
  VariantProps<typeof buttonVariants> & { // Variants from `cva`
    asChild?: boolean; // Custom prop for rendering as a different element
  };
