// src/components/organisms/sidebar2/menu/SidebarMenuSub.tsx

import * as React from "react";
import { cn } from "@/composables/utils/shadcn"; // Giả định đường dẫn
import { useSidebarContext } from "../context/SidebarContext"; // Import hook context
import { BaseSidebarComponentProps } from "../types"; // Import base props

interface SidebarMenuSubProps extends BaseSidebarComponentProps {
  /**
   * Cho biết menu con có mở mặc định hay không.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Hàm callback khi trạng thái mở của menu con thay đổi.
   */
  onOpenChange?: (open: boolean) => void;
}

const SidebarMenuSub = React.forwardRef<HTMLDivElement, SidebarMenuSubProps>(
  ({ className, defaultOpen = false, onOpenChange, children, ...props }, ref) => {
    const { state: sidebarState } = useSidebarContext();
    const [open, setOpen] = React.useState(defaultOpen);

    // Đồng bộ trạng thái mở nội bộ với prop onOpenChange
    React.useEffect(() => {
      if (onOpenChange) {
        onOpenChange(open);
      }
    }, [open, onOpenChange]);

    // Value của context mới cho sub-menu
    const subContextValue = React.useMemo(() => ({
      ...sidebarState, // Kế thừa các trạng thái từ SidebarState
      open, // Ghi đè trạng thái mở của sub-menu
      setOpen, // Hàm setter cho trạng thái mở của sub-menu
    }), [sidebarState, open, setOpen]);

    return (
      <div
        ref={ref}
        data-slot="sidebar-menu-sub"
        data-state={open ? "expanded" : "collapsed"} // Trạng thái mở/đóng của sub-menu
        data-parent-state={sidebarState.state} // Trạng thái của sidebar cha
        className={cn(
          "relative flex flex-col overflow-hidden",
          "group-data-[state=collapsed]:max-h-8 group-data-[state=collapsed]:justify-center", // Thu gọn chiều cao khi parent sidebar collapsed
          className,
        )}
        {...props}
      >
        {/* Render children với context value mới (chỉ cần truyền các thuộc tính liên quan đến sub-menu) */}
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // Chỉ clone các child là SidebarMenuSubButton, truyền setOpen để nó có thể toggle sub-menu
            if (
              child.type === SidebarMenuSubButton // Hoặc bạn có thể kiểm tra displayName
            ) {
              return React.cloneElement(child, {
                onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                  setOpen((prev) => !prev); // Toggle trạng thái mở của sub-menu
                  child.props.onClick?.(e); // Gọi hàm onClick gốc nếu có
                },
                isActive: child.props.isActive || open, // Đánh dấu active nếu sub-menu đang mở
              });
            }
          }
          return child;
        })}
        {/* Nội dung thực tế của sub-menu, ẩn khi collapsed hoặc parent collapsed */}
        <div
          className={cn(
            "flex flex-col gap-1 overflow-hidden px-2 pt-1 transition-[max-height,opacity] duration-200 ease-linear",
            "group-data-[state=collapsed]:hidden", // Ẩn hoàn toàn khi parent sidebar collapsed
            "data-[state=collapsed]:max-h-0 data-[state=collapsed]:opacity-0", // Ẩn khi sub-menu collapsed
            "data-[state=expanded]:max-h-screen data-[state=expanded]:opacity-100", // Hiển thị khi sub-menu expanded
          )}
        >
          {/* Lọc để chỉ hiển thị các SidebarMenuSubItem */}
          {React.Children.map(children, (child) => {
            // Kiểm tra và chỉ render các child là SidebarMenuSubItem (hoặc các loại khác cần thiết)
            if (React.isValidElement(child) && child.type === SidebarMenuSubItem) {
              return child;
            }
            return null; // Bỏ qua các child không phải là sub item
          })}
        </div>
      </div>
    );
  },
);

SidebarMenuSub.displayName = "SidebarMenuSub";

export { SidebarMenuSub };