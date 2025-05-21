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

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "icon",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}) {
  const { state: sidebarState, actions } = useSidebarContext();
  const isMobile = useIsMobile();

  const { openMobile } = sidebarState;
  const { setOpenMobile } = actions;

  const { state, expandedWidth, collapsedWidth } = sidebarState;

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
            width: expandedWidth, // Dùng style prop ở đây
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
              // Sử dụng CSS Custom Property (biến CSS) để dễ quản lý hơn
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
      data-state={state} // "expanded" | "collapsed"
      data-collapsible={state === "collapsed" ? collapsible : ""} // Chỉ có giá trị khi collapsed
      data-variant={variant} // "sidebar" | "floating" | "inset"
      data-side={side} // "left" | "right"
      data-slot="sidebar"
      style={ // Sử dụng style prop trên container chính
        {
          "--sidebar-width": expandedWidth,
          "--sidebar-width-icon": collapsedWidth,
          // Định nghĩa các biến CSS để sử dụng trong các child elements
          width: state === "expanded" ? expandedWidth : (collapsible === "icon" ? collapsedWidth : "0px"), // Fallback logic cho width chính
          // Các biến CSS custom property có thể được truyền xuống con
          // Để dễ dàng điều khiển khoảng trống và container
        } as React.CSSProperties
      }
    >
      {/* Đây là phần xử lý khoảng trống của sidebar trên desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0", // Khi offcanvas, gap = 0
          "group-data-[side=right]:rotate-180", // Xoay để đối xứng với right sidebar
        )}
        style={ // Dùng style prop ở đây
          {
            width: variant === "floating" || variant === "inset"
              ? (state === "expanded" ? expandedWidth : `calc(${collapsedWidth}+theme(spacing.4))`)
              : (state === "expanded" ? expandedWidth : collapsedWidth),
          } as React.CSSProperties
        }
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh transition-[left,right,width] duration-200 ease-linear md:flex",
          // Điều chỉnh left/right dựa trên side và collapsible
          side === "left"
            ? `left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]`
            : `right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]`,
          // Điều chỉnh padding cho floating và inset variants.
          variant === "floating" || variant === "inset"
            ? `p-2`
            : `group-data-[side=left]:border-r group-data-[side=right]:border-l`, // Chỉ thêm border khi variant là sidebar
          className,
        )}
        style={ // Dùng style prop ở đây
          {
            width: variant === "floating" || variant === "inset"
              ? (state === "expanded" ? expandedWidth : `calc(${collapsedWidth}+theme(spacing.4)+2px)`) // Width icon + padding + border
              : (state === "expanded" ? expandedWidth : collapsedWidth), // Chỉ width icon
          } as React.CSSProperties
        }
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          <MCTooltipProvider delayDuration={0}>{children}</MCTooltipProvider>
        </div>
      </div>
    </div>
  );
}

export { Sidebar };