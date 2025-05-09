import * as React from "react";

import { cn } from "@/composables/utils/shadcn";
import { inputVariants } from "./variants";
import { VariantProps } from "class-variance-authority";

export type DynamicInputProps = Omit<
  React.ComponentProps<"input">,
  "prefix" | "onDrag" | "onDragStart" | "onDragEnd"
> &
  VariantProps<typeof inputVariants> & {
    asChild?: boolean;
    addonBefore?: React.ReactNode;
    addonAfter?: React.ReactNode;
    prefix?: React.ReactNode;
    postfix?: React.ReactNode;
  };

function DynamicInput({
  addonBefore,
  addonAfter,
  prefix,
  postfix,
  className,
  type,
  size,
  disabled,
  ...props
}: DynamicInputProps) {
  return (
    <>
      <div
        className={cn(
          "input-container group relative flex items-center",
          inputVariants({ size, className }),
          disabled
            ? "bg-black-100/4 text-black-40 pointer-events-none opacity-50"
            : "",
        )}
      >
        {addonBefore ? (
          <div className="group-hover:border-black-40 p-0 m-0"> {addonBefore} </div>
        ) : null}

        {/* Input wrapper */}
        <div
          className={cn(
            "group-hover:border-black-40 relative flex w-full items-center px-8",
            addonBefore ? "border-l-black-10 border-l" : "",
            addonAfter ? "border-r-black-10 border-r" : "",
          )}
        >
          {prefix ? <div className="mr-8">{prefix}</div> : null}
          <input
            type={type}
            data-slot="input"
            className={cn(
              inputVariants({ size, className }),
              "disabled:text-black-40 group-hover:border-black-40 w-full rounded-none border-r-0 border-l-0 px-0 outline-none focus-visible:ring-0",
            )}
            disabled={disabled}
            {...props}
          />
          {postfix ? <div className="ml-8">{postfix}</div> : null}
        </div>
        {/* Input wrapper */}

        {addonAfter ? <div>{addonAfter}</div> : null}
      </div>
    </>
  );
}

export default DynamicInput;
