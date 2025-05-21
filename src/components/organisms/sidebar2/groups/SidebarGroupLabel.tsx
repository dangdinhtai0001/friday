// src/components/organisms/sidebar2/groups/SidebarGroupLabel.tsx

import * as React from "react";
import { Slot } from "@radix-ui/react-slot"; // Đảm bảo bạn đã cài đặt @radix-ui/react-slot
import { cn } from "@/composables/utils/shadcn";

/**
 * SidebarGroupLabel component hiển thị nhãn cho một nhóm trong sidebar.
 * Hỗ trợ prop `asChild` để render dưới dạng component khác.
 */
function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "flex px-12 py-4 rounded-8 ",
        "typography-regular-14 text-black-40",
        // "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

SidebarGroupLabel.displayName = "SidebarGroupLabel";

export { SidebarGroupLabel };
