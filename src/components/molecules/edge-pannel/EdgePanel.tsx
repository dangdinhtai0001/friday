import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";

function EdgePanel({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

export { EdgePanel };
