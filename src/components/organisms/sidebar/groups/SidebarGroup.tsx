// src/components/organisms/sidebar2/groups/SidebarGroup.tsx

import * as React from "react";
import { cn } from "@/composables/utils/shadcn"; // Đảm bảo đường dẫn này chính xác

/**
 * SidebarGroup component dùng để nhóm các mục hoặc nội dung liên quan trong sidebar.
 * Nó cung cấp một container linh hoạt với padding và margin mặc định.
 */
function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  );
}

SidebarGroup.displayName = "SidebarGroup";

export { SidebarGroup };
