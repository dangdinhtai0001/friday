// src/components/organisms/sidebar2/menu/SidebarMenuItem.tsx

import * as React from "react";
import { cn } from "@/composables/utils/shadcn"; // Giả định đường dẫn
import { useSidebarContext } from "../context/SidebarContext"; // Import hook context
import { BaseSidebarComponentProps } from "../types"; // Import base props

interface SidebarMenuItemProps extends BaseSidebarComponentProps {
  /**
   * Nội dung hiển thị khi sidebar ở trạng thái thu gọn.
   * Thường là một biểu tượng hoặc một phần tử nhỏ gọn hơn.
   */
  collapsedContent?: React.ReactNode;
}

const SidebarMenuItem = React.forwardRef<
  HTMLDivElement,
  SidebarMenuItemProps
>(({ className, children, collapsedContent, ...props }, ref) => {
  const {
    state: { state: sidebarState }, // Lấy 'state' (expanded/collapsed) từ context
  } = useSidebarContext();

  return (
    <div
      ref={ref}
      data-slot="sidebar-menu-item"
      className={cn(
        "relative rounded-12 typography-regular-14 text-black-100 flex items-center ",
        // "rounded-12 flex items-center gap-4 p-8 cursor-pointer typography-regular-14 text-black-100",
        // "relative flex h-8 items-center gap-2 overflow-hidden rounded-md px-2",
        // "group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:px-0",
        className,
      )}
      {...props}
    >
      {/* Hiển thị collapsedContent khi sidebar collapsed, ngược lại hiển thị children */}
      {sidebarState === "collapsed" && collapsedContent ? collapsedContent : children}
    </div>
  );
});

SidebarMenuItem.displayName = "SidebarMenuItem";

export { SidebarMenuItem };