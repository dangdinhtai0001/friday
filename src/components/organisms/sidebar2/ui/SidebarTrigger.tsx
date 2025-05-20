import * as React from "react";
import { cn } from "@/composables/utils/shadcn"; // Giả định đường dẫn
import { useSidebarContext } from "../context/SidebarContext"; // Import hook context
import { BaseSidebarComponentProps } from "../types"; // Import base props

interface SidebarTriggerProps extends BaseSidebarComponentProps {
  // Có thể thêm các props cụ thể nếu cần, ví dụ: icon
  /**
   * Biểu tượng hiển thị trong nút trigger (tùy chọn).
   */
  icon?: React.ReactNode;
}

const SidebarTrigger = React.forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  ({ className, icon, children, ...props }, ref) => {
    const { actions } = useSidebarContext();
    const { toggleSidebar } = actions;

    return (
      <button
        ref={ref}
        type="button" // Đảm bảo là type="button"
        onClick={() => toggleSidebar()}
        aria-label="Toggle Sidebar"
        className={cn(
          "bg-background hover:bg-muted/50 focus-visible:ring-ring inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          "md:group-data-[collapsible=none]:invisible md:group-data-[collapsible=offcanvas]:invisible", // Ẩn khi offcanvas hoặc none
          className,
        )}
        {...props}
      >
        {icon || children}
      </button>
    );
  },
);

SidebarTrigger.displayName = "SidebarTrigger";

export { SidebarTrigger };
