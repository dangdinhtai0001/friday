// src/components/organisms/sidebar2/menu/SidebarMenuSub.tsx

import * as React from "react";
import { cn } from "@/composables/utils/shadcn";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SidebarMenuSubProps extends React.ComponentProps<"div"> {}

const SidebarMenuSub = React.forwardRef<
  HTMLDivElement, // ref sẽ là HTMLDivElement
  SidebarMenuSubProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="sidebar-menu-sub"
      className={cn(
        "flex w-full flex-col", // CSS cơ bản: cột, có khoảng cách giữa các mục con
        "border-l border-black-100/4 ml-8 pl-4",
        className, // Các lớp CSS tùy chỉnh
      )}
      {...props}
    />
  );
});

SidebarMenuSub.displayName = "SidebarMenuSub";

export { SidebarMenuSub };
