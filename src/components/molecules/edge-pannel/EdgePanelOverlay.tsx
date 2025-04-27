import { cn } from "@/composables/lib/utils";
import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";

function EdgePanelOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50",
        "bg-gradient-to-t from-background-3/80 to-background-4/80 backdrop-blur-8",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        className,
      )}
      {...props}
    />
  );
}

export { EdgePanelOverlay };
