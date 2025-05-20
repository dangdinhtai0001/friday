import * as React from "react";
import { cn } from "@/composables/utils/shadcn"; // Giả định đường dẫn
import { Input } from "@/components/atoms/input";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SidebarInputProps extends React.ComponentProps<typeof Input> {
  // Bạn có thể thêm các props cụ thể cho SidebarInput nếu cần
}

const SidebarInput = React.forwardRef<HTMLInputElement, SidebarInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        className={cn(
          "h-8 w-full", // Chiều cao và chiều rộng mặc định
          "group-data-[state=collapsed]:invisible group-data-[state=collapsed]:w-0 group-data-[state=collapsed]:overflow-hidden", // Ẩn khi collapsed
          className,
        )}
        {...props}
      />
    );
  },
);

SidebarInput.displayName = "SidebarInput";

export { SidebarInput };