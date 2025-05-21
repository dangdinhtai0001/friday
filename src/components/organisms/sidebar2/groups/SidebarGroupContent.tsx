// src/components/organisms/sidebar2/groups/SidebarGroupContent.tsx

import * as React from "react";
import { cn } from "@/composables/utils/shadcn";

/**
 * SidebarGroupContent component chứa nội dung chính của một nhóm trong sidebar.
 */
function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full", className)}
      {...props}
    />
  );
}

SidebarGroupContent.displayName = "SidebarGroupContent";

export { SidebarGroupContent };