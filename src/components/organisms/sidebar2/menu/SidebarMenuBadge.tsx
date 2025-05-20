// src/components/organisms/sidebar2/menu/SidebarMenuBadge.tsx

import * as React from "react";
import { cn } from "@/composables/utils/shadcn"; // Giả định đường dẫn
import { useSidebarContext } from "../context/SidebarContext"; // Import hook context

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SidebarMenuBadgeProps extends React.ComponentProps<"span"> {
  // Có thể thêm các props cụ thể nếu cần, ví dụ: variant của badge
}

const SidebarMenuBadge = React.forwardRef<
  HTMLSpanElement,
  SidebarMenuBadgeProps
>(({ className, children, ...props }, ref) => {
  const {
    state: { state: sidebarState }, // Lấy 'state' (expanded/collapsed) từ context
  } = useSidebarContext();

  return (
    <span
      ref={ref}
      data-slot="sidebar-menu-badge"
      className={cn(
        "bg-primary text-primary-foreground ml-auto inline-flex h-5 shrink-0 items-center justify-center rounded-full px-2 text-xs font-medium",
        "group-data-[state=collapsed]:absolute group-data-[state=collapsed]:-right-2 group-data-[state=collapsed]:top-1/2 group-data-[state=collapsed]:-translate-y-1/2 group-data-[state=collapsed]:px-1 group-data-[state=collapsed]:py-0.5 group-data-[state=collapsed]:min-w-4 group-data-[state=collapsed]:h-4 group-data-[state=collapsed]:text-[0.6rem]", // Style khi collapsed
        className,
      )}
      {...props}
    >
      {/* Ẩn nội dung khi collapsed và badge không quá lớn (chỉ hiển thị dấu chấm) */}
      {sidebarState === "collapsed" && (typeof children === "number" || typeof children === "string") && children.toString().length > 1
        ? children
        : sidebarState !== "collapsed"
        ? children
        : ""}
    </span>
  );
});

SidebarMenuBadge.displayName = "SidebarMenuBadge";

export { SidebarMenuBadge };