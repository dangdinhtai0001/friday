import { cva } from "class-variance-authority";

export const inputVariants = cva(
  [
    "text-black-100 border-black-10 bg-primary-background rounded-8 border-[0.5px] outline-none",
    "hover:border-black-40",
    "disabled:bg-black-100/4 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:text-black-20",
    "focus-visible:border-ring focus-visible:ring-black-5 focus-visible:ring-4",
    "placeholder:text-black-20",
  ].join(" "),
  {
    variants: {
      size: {
        small: "px-8 py-4 typography-regular-14 gap-4 h-28",
        medium: "px-16 py-8 typography-regular-16 gap-8 h-40",
        large: "rounded-16 px-20 py-16 typography-regular-18 gap-8 h-[56px]",
      },
    },
    defaultVariants: {
      size: "small",
    },
  },
);
