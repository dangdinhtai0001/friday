import * as React from "react";

import { cn } from "@/composables/utils/shadcn";

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header bg-blue-300"
      className={cn("flex flex-col", className)}
      {...props}
    />
  );
}

export default SheetHeader;
