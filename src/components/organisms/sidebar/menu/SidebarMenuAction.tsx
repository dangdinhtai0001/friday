// src/components/organisms/sidebar2/menu/SidebarMenuAction.tsx

import * as React from "react";
import { cn } from "@/composables/utils/shadcn"; // Giả định đường dẫn
import { useSidebarContext } from "../context/SidebarContext"; // Import hook context
import { SidebarMenuActionProps } from "../types"; // Import props

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuActionProps
>(
  (
    { className, showOnHover = false, asChild = false, children, ...props },
    ref,
  ) => {
    const {
      state: { state: sidebarState },
    } = useSidebarContext();
    const Comp = asChild ? "span" : "button"; // Render as a span if asChild is true

    return (
      <Comp
        ref={ref}
        data-slot="sidebar-menu-action"
        type={asChild ? undefined : "button"} // Chỉ đặt type nếu không phải asChild
        className={cn(
          "bg-background text-foreground hover:bg-muted focus-visible:ring-ring inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          "group-data-[state=collapsed]:hidden", // Ẩn khi sidebar collapsed
          showOnHover && "opacity-0 transition-opacity group-hover:opacity-100", // Hiển thị khi hover
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

SidebarMenuAction.displayName = "SidebarMenuAction";

export { SidebarMenuAction };
