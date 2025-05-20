// src/components/organisms/sidebar2/menu/SidebarMenuSubItem.tsx

import * as React from "react";
import { cn } from "@/composables/utils/shadcn"; // Giả định đường dẫn
import { BaseSidebarComponentProps } from "../types"; // Import base props

const SidebarMenuSubItem = React.forwardRef<
  HTMLDivElement,
  BaseSidebarComponentProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="sidebar-menu-sub-item"
      className={cn(
        "relative flex h-7 items-center gap-2 overflow-hidden rounded-md pl-4", // pl-4 để tạo indent
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

export { SidebarMenuSubItem };