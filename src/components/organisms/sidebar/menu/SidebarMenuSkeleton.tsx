// src/components/organisms/sidebar2/menu/SidebarMenuSkeleton.tsx

import * as React from "react";
import { cn } from "@/composables/utils/shadcn"; // Giả định đường dẫn
import { SidebarMenuSkeletonProps } from "../types"; // Import props
import { useSidebarContext } from "../context/SidebarContext"; // Import hook context
import { MCSkeleton } from "@/components/atoms/skeleton";

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  SidebarMenuSkeletonProps
>(({ className, showIcon = false, ...props }, ref) => {
  const {
    state: { state: sidebarState }, // Lấy 'state' (expanded/collapsed) từ context
  } = useSidebarContext();

  return (
    <div
      ref={ref}
      data-slot="sidebar-menu-skeleton"
      className={cn(
        "flex h-8 w-full items-center gap-2",
        "group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:px-0",
        className,
      )}
      {...props}
    >
      {/* Hiển thị Skeleton cho Icon nếu showIcon là true */}
      {showIcon && (
        <MCSkeleton
          className={cn(
            "h-5 w-5 rounded-md",
            sidebarState === "collapsed" && "shrink-0", // Đảm bảo icon không bị co lại khi collapsed
          )}
        />
      )}
      {/* Skeleton cho văn bản, ẩn khi collapsed */}
      <MCSkeleton
        className={cn(
          "h-5 flex-1 rounded-md",
          sidebarState === "collapsed" && "hidden", // Ẩn khi collapsed
        )}
      />
    </div>
  );
});

SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

export { SidebarMenuSkeleton };