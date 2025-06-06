import {
  ECTooltip,
  ECTooltipContent,
  ECTooltipProvider,
  ECTooltipTrigger,
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
      <ECTooltipProvider>
        <ECTooltip>
          <ECTooltipTrigger asChild>{children}</ECTooltipTrigger>
          <ECTooltipContent side="right">{tooltip}</ECTooltipContent>
        </ECTooltip>
      </ECTooltipProvider>
    );
  }

  return children;
}

export default CollapsedSidebarItemTrigger;
