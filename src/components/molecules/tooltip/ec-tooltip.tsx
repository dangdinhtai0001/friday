import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { ECTooltipProvider } from ".";

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <ECTooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </ECTooltipProvider>
  );
}

export default Tooltip;
