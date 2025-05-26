import {
  MCTooltip,
  MCTooltipContent,
  MCTooltipProvider,
  MCTooltipTrigger,
} from "@/components/molecules/tooltip";
import { PropsWithChildren } from "react";

interface CollapsedSidebarItemTriggerProps {
  tooltip?: string | React.ReactNode;
}

function CollapsedSidebarItemTrigger({
  tooltip,
  children,
}: PropsWithChildren<CollapsedSidebarItemTriggerProps>) {

  if (tooltip) {
    return (
      <MCTooltipProvider>
        <MCTooltip>
          <MCTooltipTrigger asChild>{children}</MCTooltipTrigger>
          <MCTooltipContent side="right">{tooltip}</MCTooltipContent>
        </MCTooltip>
      </MCTooltipProvider>
    );
  }

  return children;
}

export default CollapsedSidebarItemTrigger;
