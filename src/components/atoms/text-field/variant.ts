import { cva } from "class-variance-authority";

export const textFieldVariants = cva(
  [
    "text-black-100 border-black-10 bg-primary-background rounded-8 border-[0.5px] outline-none hover:border-black-40",
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

export const addonVariant = cva(
  [
    "border-black-10 rounded-8 border-[0.5px] group-hover:border-black-40 ",
  ].join(" "),
  {
    variants: {
      size: {
        small: "h-28",
        medium: "h-40",
        large: "h-[56px]",
      },
    },
    defaultVariants: {
      size: "small",
    },
  },
);
