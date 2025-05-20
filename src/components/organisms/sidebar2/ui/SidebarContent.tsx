import * as React from "react";
import { cn } from "@/composables/utils/shadcn"; // Giả định đường dẫn
import { BaseSidebarComponentProps } from "../types"; // Import base props

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  BaseSidebarComponentProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="sidebar-content"
      className={cn("flex-1 overflow-auto p-4", className)} // flex-1 để chiếm hết chiều cao còn lại, overflow-auto để cuộn
      {...props}
    >
      {children}
    </div>
  );
});

SidebarContent.displayName = "SidebarContent";

export { SidebarContent };
