import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "rounded-8 text-black-100 disabled:text-black-10 disabled:pointer-events-none hover:cursor-pointer",
  {
    variants: {
      variant: {
        borderless: "hover:bg-black-100/4",
        neutral: "bg-black-100/4 hover:bg-black-20 disabled:bg-black-100/4",
        outline: "border-[1px] border-black-10 hover:bg-black-20",
        filled:
          "bg-primary-brand text-white-100 hover:opacity-85 disabled:bg-black-100/4 ",
        icon: "",
      },
      size: {
        small: "px-8 py-4 typography-regular-14 gap-4 h-28",
        medium: "px-16 py-8 typography-regular-16 gap-8 h-40",
        large: "px-24 py-12 typography-regular-18 gap-8 h-[56px]",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "small",
    },
  },
);
