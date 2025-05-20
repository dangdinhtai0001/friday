import * as React from "react";
import { cn } from "@/composables/utils/shadcn"; // Giả định đường dẫn
import { BaseSidebarComponentProps } from "../types"; // Import base props

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  BaseSidebarComponentProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="sidebar-header"
      className={cn(
        "flex h-14 items-center justify-between p-4",
        "group-data-[state=collapsed]:justify-center", // Căn giữa khi collapsed
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

SidebarHeader.displayName = "SidebarHeader";

export { SidebarHeader };