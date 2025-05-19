import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { MCTooltipProvider } from ".";

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <MCTooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </MCTooltipProvider>
  );
}

export default Tooltip;
