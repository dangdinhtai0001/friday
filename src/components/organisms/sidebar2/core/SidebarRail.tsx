import * as React from "react";
import { cn } from "@/composables/utils/shadcn";
import { useSidebarContext } from "../context/SidebarContext"; // Import hook context

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { actions } = useSidebarContext(); // Lấy actions từ context

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1} // Không thể focus bằng tab để tránh gián đoạn flow bàn phím chính
      onClick={actions.toggleSidebar} // Gọi toggleSidebar từ context
      title="Toggle Sidebar"
      className={cn(
        "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className,
      )}
      {...props}
    />
  );
}

export { SidebarRail }; // Export để sử dụng trong index.ts
