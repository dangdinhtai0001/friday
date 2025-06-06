// src/components/organisms/sidebar2/ui/SidebarSeparator.tsx

import * as React from "react";
import { cn } from "@/composables/utils/shadcn"; // Giả định đường dẫn
import { ECSeparator } from "@/components/atoms/separator";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SidebarSeparatorProps extends React.ComponentProps<typeof ECSeparator> {
  // Bạn có thể thêm các props cụ thể cho SidebarSeparator nếu cần
}

const SidebarSeparator = React.forwardRef<
  HTMLDivElement, // Separator của Shadcn thường là div
  SidebarSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <ECSeparator
      ref={ref}
      className={cn(
        "my-4", // Khoảng cách trên và dưới
        "group-data-[state=collapsed]:my-0 group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:h-0", // Ẩn khi collapsed
        className,
      )}
      {...props}
    />
  );
});

SidebarSeparator.displayName = "SidebarSeparator";

export { SidebarSeparator };