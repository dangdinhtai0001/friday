import { cva } from "class-variance-authority";

// // Base styles
// const baseStyles = [
//   "inline-flex items-center justify-center whitespace-nowrap", // Layout and alignment
//   "rounded-8 gap-4", // Sizing and spacing
//   "disabled:pointer-events-none disabled:opacity-50", // Interaction states
//   "transition-colors", // Transitions
//   "cursor-pointer disabled:cursor-not-allowed", // Cursor behavior
//   "typography-regular-14", // Typography
// ].join(" ");
// // Variant styles
// const variantStyles = {
//   outline:
//     "border-[1px] border-input border-black-10 hover:bg-black-5 hover:border-black-20",
//   ghost: "hover:bg-black-5",
//   solid: "bg-black-10",
//   primary:
//     "bg-primary-brand text-white-100 hover:bg-gradient-to-t hover:from-primary-brand hover:to-white-40",
// };

// hover:opacity-70 disabled:opacity-70
// Base styles
const baseStyles = [
  "rounded-8 gap-4 typography-regular-14 cursor-pointer transition-colors text-black-100 disabled:text-black-20 disabled:cursor-not-allowed focus:ring-0 focus:ring-offset-0 disabled:pointer-events-none",
].join(" ");
// Variant styles
const variantStyles = {
  borderless: "bg-transparent border-none hover:bg-black-5 ",
  default: "bg-black-5 hover:bg-black-20 disabled:bg-black-5",
  outline:
    "border-1 border-black-10 hover:bg-black-5 hover:border-black-20 disabled:border-black-10 disabled:bg-transparent",
  filled:
    "bg-primary-brand text-white-100 hover:opacity-70 disabled:bg-black-5",
};

// Size styles
const sizeStyles = {
  default: "px-2 py-1",
  icon: "",
};

// Combined button variants
const buttonVariants = cva(baseStyles, {
  variants: {
    variant: variantStyles,
    size: sizeStyles,
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export default buttonVariants;
