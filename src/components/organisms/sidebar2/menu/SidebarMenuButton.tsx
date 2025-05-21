// src/components/organisms/sidebar2/menu/SidebarMenuButton.tsx

import * as React from "react";
import { Slot } from "@radix-ui/react-slot"; // Cần cài đặt @radix-ui/react-slot nếu chưa có
import { cn } from "@/composables/utils/shadcn"; // Đảm bảo đường dẫn này chính xác
import { IconLoader } from "@/components/atoms/icon-loader";

interface SidebarMenuButtonProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
  isActive?: boolean;
  // Bạn có thể thêm các props khác nếu cần, ví dụ: icon, text
  icon?: React.ReactNode | string;
  text?: string | React.ReactNode;
}

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement, // Đảm bảo ref type là HTMLButtonElement
  SidebarMenuButtonProps
>(
  (
    {
      className,
      asChild = false,
      isActive = false,
      icon,
      text,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref} // Đảm bảo ref được truyền xuống
        data-slot="sidebar-menu-button"
        data-sidebar="menu-button"
        data-active={isActive} // Dùng data-active để xử lý style khi active
        className={cn("flex cursor-pointer items-center gap-8", className)}
        {...props}
      >
        {typeof icon === "string" ? <IconLoader name={icon} /> : icon}
        {typeof text === "string" ? <span>{text}</span> : text}
        {children}
      </Comp>
    );
  },
);

SidebarMenuButton.displayName = "SidebarMenuButton";

export { SidebarMenuButton };
