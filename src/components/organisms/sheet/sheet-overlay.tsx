import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/composables/utils/shadcn";

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50",
        "from-background-4 to-background-3 backdrop-blur-40 bg-gradient-to-br",
        className,
      )}
      {...props}
    ></SheetPrimitive.Overlay>
  );
}

export default SheetOverlay;
