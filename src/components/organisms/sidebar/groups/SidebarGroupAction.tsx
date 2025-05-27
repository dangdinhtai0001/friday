// src/components/organisms/sidebar2/groups/SidebarGroupAction.tsx

import * as React from "react";
import { Slot } from "@radix-ui/react-slot"; // Đảm bảo bạn đã cài đặt @radix-ui/react-slot
import { cn } from "@/composables/utils/shadcn";

/**
 * SidebarGroupAction component là một nút hành động cho một nhóm trong sidebar.
 * Hỗ trợ prop `asChild` để render dưới dạng component khác.
 */
function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) { // Đảm bảo là React.ComponentProps<"button">
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Tăng vùng click cho nút trên thiết bị di động.
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden", // Ẩn khi sidebar thu gọn kiểu icon
        className,
      )}
      {...props}
    />
  );
}

SidebarGroupAction.displayName = "SidebarGroupAction";

export { SidebarGroupAction };