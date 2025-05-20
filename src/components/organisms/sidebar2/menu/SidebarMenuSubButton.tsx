// src/components/organisms/sidebar2/menu/SidebarMenuSubButton.tsx

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority"; // Giả định đường dẫn
import { cn } from "@/composables/utils/shadcn"; // Giả định đường dẫn

import { useSidebarContext } from "../context/SidebarContext"; // Import hook context
import { SidebarMenuSubButtonProps } from "../types"; // Import props đã cập nhật
import { MCTooltip, MCTooltipContent, MCTooltipTrigger } from "@/components/molecules/tooltip"; // Import Tooltip components
import { ChevronRightIcon } from "lucide-react";

// Định nghĩa các biến thể cho nút menu con
const sidebarMenuSubButtonVariants = cva(
  "inline-flex w-full items-center justify-start whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-7 px-2",
        md: "h-8 px-2",
      },
      isActive: {
        true: "bg-muted font-semibold", // Kiểu khi mục đang hoạt động (active)
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

interface SidebarMenuSubButtonInternalProps
  extends Omit<SidebarMenuSubButtonProps, "size" | "isActive">, // Omit các props đã được cva xử lý
    VariantProps<typeof sidebarMenuSubButtonVariants> {}

const SidebarMenuSubButton = React.forwardRef<
  HTMLButtonElement, // Đổi từ HTMLAnchorElement sang HTMLButtonElement nếu nó là nút
  SidebarMenuSubButtonInternalProps
>(({ className, size, isActive, tooltip, children, ...props }, ref) => {
  const {
    state: { state: sidebarState }, // Lấy 'state' (expanded/collapsed) từ context
  } = useSidebarContext();

  const buttonContent = (
    <button // Đổi từ 'a' sang 'button'
      ref={ref}
      type="button" // Đảm bảo là type="button"
      className={cn(
        sidebarMenuSubButtonVariants({ size, className, isActive }), // Truyền các variant vào đây
        "group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:px-0",
        sidebarState === "collapsed" && !tooltip
          ? "group-data-[state=collapsed]:w-8 group-data-[state=collapsed]:h-8 group-data-[state=collapsed]:p-0"
          : "",
        "relative", // Để icon mũi tên có thể được đặt absolute
      )}
      {...props}
    >
      <span
        className={cn(
          "group-data-[state=collapsed]:hidden",
          "flex-1",
        )}
      >
        {children}
      </span>
      {/* Icon mũi tên xoay */}
      <ChevronRightIcon
        className={cn(
          "absolute right-2 h-4 w-4 shrink-0 transition-transform duration-200",
          "group-data-[parent-state=collapsed]:hidden", // Ẩn khi sidebar cha collapsed
          "group-data-[state=expanded]:rotate-90", // Xoay 90 độ khi sub-menu mở
        )}
      />
    </button>
  );

  if (sidebarState === "collapsed" && tooltip) {
    return (
      <MCTooltip>
        <MCTooltipTrigger asChild>{buttonContent}</MCTooltipTrigger>
        <MCTooltipContent
          side="right"
          className="animate-none"
          sideOffset={8}
          align="center"
        >
          {tooltip}
        </MCTooltipContent>
      </MCTooltip>
    );
  }

  return buttonContent;
});

SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export { SidebarMenuSubButton, sidebarMenuSubButtonVariants };