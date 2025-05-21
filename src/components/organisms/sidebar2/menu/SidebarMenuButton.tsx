// src/components/organisms/sidebar2/menu/SidebarMenuButton.tsx

import * as React from "react";
import { Slot } from "@radix-ui/react-slot"; // Cần cài đặt @radix-ui/react-slot nếu chưa có
import { cn } from "@/composables/utils/shadcn"; // Đảm bảo đường dẫn này chính xác

interface SidebarMenuButtonProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
  isActive?: boolean;
  // Bạn có thể thêm các props khác nếu cần, ví dụ: icon, text
  // icon?: React.ReactNode;
  // text?: string;
}

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement, // Đảm bảo ref type là HTMLButtonElement
  SidebarMenuButtonProps
>(({ className, asChild = false, isActive = false, children, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref} // Đảm bảo ref được truyền xuống
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-active={isActive} // Dùng data-active để xử lý style khi active
      className={cn(
        "flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm", // CSS cơ bản
        "outline-none ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", // Focus ring cơ bản
        "hover:bg-muted/50 transition-colors", // Hiệu ứng hover cơ bản
        "disabled:pointer-events-none disabled:opacity-50", // Trạng thái disabled
        "data-[active=true]:bg-accent data-[active=true]:text-accent-foreground", // Style khi active
        className, // Các lớp CSS tùy chỉnh từ props
      )}
      {...props}
    >
      {/* Bạn có thể đặt logic hiển thị icon/text trực tiếp ở đây 
        nếu bạn muốn SidebarMenuButton tự quyết định dựa trên một prop
        Ví dụ: {icon} {text && <span>{text}</span>}
      */}
      {children} {/* Children sẽ là nội dung của nút */}
    </Comp>
  );
});

SidebarMenuButton.displayName = "SidebarMenuButton";

export { SidebarMenuButton };