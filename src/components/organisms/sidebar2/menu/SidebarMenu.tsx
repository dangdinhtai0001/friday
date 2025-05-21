import * as React from "react";
import { cn } from "@/composables/utils/shadcn";
import { BaseSidebarComponentProps } from "../types";

const SidebarMenu = React.forwardRef<HTMLDivElement, BaseSidebarComponentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="sidebar-menu"
        className={cn("flex flex-col", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

SidebarMenu.displayName = "SidebarMenu";

export { SidebarMenu };