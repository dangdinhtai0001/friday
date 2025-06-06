import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/composables/utils/shadcn";

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("rounded-8 typography-regular-12 text-black-100/65 ", className)}
      {...props}
    />
  );
}

export default SheetDescription;
