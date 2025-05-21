// src/components/organisms/sidebar2/core/Sidebar.tsx

import * as React from "react";
import { useIsMobile } from "@/composables/hooks/use-mobile";
import { cn } from "@/composables/utils/shadcn";

import { useSidebarContext } from "../context/SidebarContext"; // Import hook context
import {
  MCSheet,
  MCSheetContent,
  MCSheetDescription,
  MCSheetHeader,
  MCSheetTitle,
} from "@/components/organisms/sheet";
import { MCTooltipProvider } from "@/components/molecules/tooltip";
import { motion } from "motion/react";
import { SIDEBAR_TRANSITION_DURATION } from "../constants";

type SidebarProps = Omit<
  React.ComponentProps<"div">,
  "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"
> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
};

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "icon",
  className,
  children,
  ...props // Giữ lại props ở đây
}: SidebarProps) {
  const { state: sidebarState, actions } = useSidebarContext();
  const isMobile = useIsMobile();

  const { openMobile } = sidebarState;
  const { setOpenMobile } = actions;

  const { state, expandedWidth, collapsedWidth } = sidebarState;

  // Định nghĩa transition chung cho các animation
  const sidebarTransition = {
    duration: SIDEBAR_TRANSITION_DURATION,
    ease: "linear", // Sử dụng ease linear hoặc custom easing nếu bạn muốn
  };

  // **********************************************
  // * Logic cho các variants animation của desktop *
  // **********************************************

  // Variants cho sidebar-gap (width)
  const gapVariants = {
    // Trạng thái "expanded" của gap
    expanded: {
      width: expandedWidth,
      // Khi offcanvas, gap không có chiều rộng, nên nó sẽ bị ẩn đi
      // Dùng animation 'opacity' để chuyển đổi mượt mà hơn nếu cần
      opacity: collapsible === "offcanvas" ? 0 : 1,
    },
    // Trạng thái "collapsed" của gap
    collapsed: {
      width:
        collapsible === "offcanvas"
          ? "0px" // offcanvas: gap = 0
          : variant === "floating" || variant === "inset"
            ? `calc(${collapsedWidth} + 1rem)` // Giả sử theme(spacing.4) là 1rem (16px)
            : collapsedWidth,
      opacity: collapsible === "offcanvas" ? 0 : 1,
    },
  };

  // Variants cho sidebar-container (width và left/right)
  const containerVariants = {
    // Trạng thái "expanded" của container
    expanded: {
      width: expandedWidth,
      // Đặt vị trí dựa trên side
      [side === "left" ? "left" : "right"]: 0,
    },
    // Trạng thái "collapsed" của container
    collapsed: {
      width:
        variant === "floating" || variant === "inset"
          ? `calc(${collapsedWidth} + 1rem + 2px)` // Giả sử theme(spacing.4) là 1rem (16px) và 2px border
          : collapsedWidth,
      // Đặt vị trí dựa trên side và collapsible type
      [side === "left" ? "left" : "right"]:
        collapsible === "offcanvas"
          ? `calc(${expandedWidth} * -1)` // Kéo ra ngoài màn hình
          : 0, // Vẫn ở vị trí 0 nếu không phải offcanvas
    },
  };

  // Render khi collapsible là 'none' (luôn mở, không thu gọn)
  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "bg-sidebar text-sidebar-foreground flex h-full flex-col",
          className,
        )}
        style={
          {
            width: expandedWidth,
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </div>
    );
  }

  // Render cho thiết bị di động
  if (isMobile) {
    return (
      <MCSheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <MCSheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground p-0 [&>button]:hidden"
          style={
            {
              "--sidebar-width": `var(--sidebar-width-mobile, ${expandedWidth})`,
            } as React.CSSProperties
          }
          side={side}
        >
          <MCSheetHeader className="sr-only">
            <MCSheetTitle>Sidebar</MCSheetTitle>
            <MCSheetDescription>
              Displays the mobile sidebar.
            </MCSheetDescription>
          </MCSheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </MCSheetContent>
      </MCSheet>
    );
  }

  // Render cho desktop
  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
      // Loại bỏ style width trực tiếp ở đây, để Framer Motion quản lý
      // Hoặc chỉ giữ các biến CSS nếu các component con khác vẫn dùng chúng
      style={
        {
          "--sidebar-width": expandedWidth,
          "--sidebar-width-icon": collapsedWidth,
        } as React.CSSProperties
      }
    >
      {/* Đây là phần xử lý khoảng trống của sidebar trên desktop */}
      <motion.div
        data-slot="sidebar-gap"
        className={cn(
          "relative bg-transparent",
          // Loại bỏ group-data-[collapsible=offcanvas]:w-0 vì logic này nằm trong variants
          "group-data-[side=right]:rotate-180", // Vẫn giữ các lớp Tailwind tĩnh
        )}
        variants={gapVariants}
        // state là "expanded" hoặc "collapsed" -> sẽ tự động khớp với keys trong gapVariants
        animate={state}
        transition={sidebarTransition}
      />
      <motion.div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh md:flex",
          // Các lớp liên quan đến position (left-0, right-0) cũng nên được Framer Motion quản lý
          // để có animation mượt mà. Loại bỏ 'transition-[left,right,width]'
          // và các lớp 'left-0'/'right-0' nếu bạn muốn animate chúng hoàn toàn bằng FM.
          // Tuy nhiên, để khởi đầu đơn giản, ta giữ chúng và chỉ animate left/right trong variants.
          variant === "floating" || variant === "inset"
            ? `p-2`
            : `group-data-[side=left]:border-r group-data-[side=right]:border-l`,
          className,
        )}
        variants={containerVariants}
        // state là "expanded" hoặc "collapsed" -> sẽ tự động khớp với keys trong containerVariants
        animate={state}
        transition={sidebarTransition}
        // Loại bỏ {...props} ở đây để tránh ghi đè các props mà Framer Motion đang kiểm soát
        // Nếu bạn muốn truyền props xuống container, hãy lọc chúng hoặc đảm bảo chúng không xung đột
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          <MCTooltipProvider delayDuration={0}>{children}</MCTooltipProvider>
        </div>
      </motion.div>
    </div>
  );
}

export { Sidebar };
