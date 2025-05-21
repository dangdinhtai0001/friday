// src/components/organisms/sidebar2/menu/SidebarMenuButton.tsx

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority"; // Giả định đường dẫn
import { cn } from "@/composables/utils/shadcn"; // Giả định đường dẫn

import { useSidebarContext } from "../context/SidebarContext"; // Import hook context
import { SidebarMenuButtonProps } from "../types"; // Import props đã định nghĩa
import {
  MCTooltip,
  MCTooltipContent,
  MCTooltipTrigger,
} from "@/components/molecules/tooltip"; // Import Tooltip components

// Định nghĩa các biến thể cho nút menu
const sidebarMenuButtonVariants = cva(
  "inline-flex w-full items-center justify-start whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-sidebar-foreground hover:bg-muted active:bg-muted-foreground/10",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-8 px-2",
        sm: "h-7 px-2",
        lg: "h-9 px-3",
      },
      isActive: {
        true: "bg-muted font-semibold", // Kiểu khi mục đang hoạt động (active)
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface SidebarMenuButtonInternalProps
  extends SidebarMenuButtonProps,
    VariantProps<typeof sidebarMenuButtonVariants> {}

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonInternalProps
>(
  (
    { className, variant, size, isActive, tooltip, children, ...props },
    ref,
  ) => {
    const {
      state: { state: sidebarState }, // Lấy 'state' (expanded/collapsed) từ context
    } = useSidebarContext();

    const buttonContent = (
      <button
        ref={ref}
        className={cn(
          "hover:bg-black-100/4 rounded-12 flex items-center gap-4 p-8",
          "typography-regular-14 text-black-100",
          "cursor-pointer",
          sidebarMenuButtonVariants({ variant, size, className }),
          isActive && sidebarMenuButtonVariants({ isActive: true }), // Áp dụng kiểu active
          "group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:px-0",
          // Ẩn nội dung khi collapsed và không phải tooltip
          sidebarState === "collapsed" && !tooltip
            ? "group-data-[state=collapsed]:h-8 group-data-[state=collapsed]:w-8 group-data-[state=collapsed]:p-0"
            : "",
        )}
        {...props}
      >
        {/* Ẩn văn bản khi collapsed, chỉ hiển thị nếu sidebar expanded */}
        <span
          className={cn(
            "group-data-[state=collapsed]:hidden", // Ẩn văn bản khi collapsed
            "flex-1", // Để icon/text chiếm hết không gian
          )}
        >
          {children}
        </span>
      </button>
    );

    // Nếu sidebar collapsed và có tooltip, bọc nút bằng Tooltip
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
  },
);

SidebarMenuButton.displayName = "SidebarMenuButton";

export { SidebarMenuButton, sidebarMenuButtonVariants };
