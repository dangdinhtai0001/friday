import { cva } from "class-variance-authority";

// Base styles
const baseStyles = [
  "inline-flex items-center justify-center whitespace-nowrap", // Layout and alignment
  "rounded-8 gap-4", // Sizing and spacing
  "disabled:pointer-events-none disabled:opacity-50", // Interaction states
  "transition-colors", // Transitions
  "cursor-pointer disabled:cursor-not-allowed", // Cursor behavior
  "typography-regular-14", // Typography
].join(" ");
// Variant styles
const variantStyles = {
  outline:
    "border-[1px] border-input border-black-10 hover:bg-black-5 hover:border-black-20",
  ghost: "hover:bg-black-5",
  solid: "bg-black-10",
  primary:
    "bg-primary-brand text-white-100 hover:bg-gradient-to-t hover:from-primary-brand hover:to-white-40",
};

// Size styles
const sizeStyles = {
  default: "h-28 px-8 py-4",
  icon: "h-28 w-28 px-4 py-4",
};

// Combined button variants
const buttonVariants = cva(baseStyles, {
  variants: {
    variant: variantStyles,
    size: sizeStyles,
  },
  defaultVariants: {
    variant: "solid",
    size: "default",
  },
});

export default buttonVariants;
