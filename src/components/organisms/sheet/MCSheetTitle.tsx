import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/composables/utils/shadcn";
import { IconLoader } from "@/components/atoms/icon-loader";

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <>
      <div
        className={cn(
          "rounded-8 typography-regular-18 text-black-100 flex items-center justify-between gap-8",
          className,
        )}
      >
        <SheetPrimitive.Title data-slot="sheet-title" {...props} />
        <SheetPrimitive.Close className="">
          <IconLoader name="x" />
        </SheetPrimitive.Close>
      </div>
      <div className="border-black-10 border-le border-b-[0.5px] m-4"></div>
    </>
  );
}

export default SheetTitle;
