// src/components/organisms/sidebar2/menu/SidebarMenuSubButton.tsx

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/composables/utils/shadcn"; // Đảm bảo đường dẫn chính xác

interface SidebarMenuSubButtonProps
  extends React.ComponentPropsWithoutRef<"a"> { // Sử dụng ComponentPropsWithoutRef
  asChild?: boolean;
  isActive?: boolean;
}

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement, // ref sẽ là HTMLAnchorElement
  SidebarMenuSubButtonProps
>(({ asChild = false, isActive = false, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"; // Mặc định render ra thẻ <a>

  return (
    <Comp
      ref={ref}
      data-slot="sidebar-menu-sub-button"
      data-active={isActive}
      className={cn(
        "flex items-center gap-4 h-full", // CSS cơ bản, đơn giản hóa
        className // Các lớp CSS tùy chỉnh
      )}
      {...props}
    />
  );
});

SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export { SidebarMenuSubButton };