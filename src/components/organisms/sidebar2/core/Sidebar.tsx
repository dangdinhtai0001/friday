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

  // ĐÃ SỬA LỖI: Lấy openMobile từ sidebarState, setOpenMobile từ actions
  const { openMobile } = sidebarState;
  const { setOpenMobile } = actions;

  // Lấy trạng thái từ context
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
              "--sidebar-width": `var(--sidebar-width-mobile, ${sidebarState.expandedWidth})`, // Sử dụng chiều rộng mobile từ constant nếu có, hoặc expandedWidth
            } as React.CSSProperties
          }
          side={side} // Sử dụng side prop
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
      style={
        {
          "--sidebar-width": expandedWidth,
          "--sidebar-width-icon": collapsedWidth, // Chiều rộng khi thu gọn kiểu icon
        } as React.CSSProperties
      }
    >
      {/* Đây là phần xử lý khoảng trống của sidebar trên desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative bg-transparent transition-[width] duration-200 ease-linear",
          `w-[${expandedWidth}]`, // Mặc định là chiều rộng mở rộng
          "group-data-[collapsible=offcanvas]:w-0", // Khi offcanvas, gap = 0
          "group-data-[side=right]:rotate-180", // Xoay để đối xứng với right sidebar
          variant === "floating" || variant === "inset"
            ? `group-data-[collapsible=icon]:w-[calc(${collapsedWidth}+theme(spacing.4))]` // Width icon + padding
            : `group-data-[collapsible=icon]:w-[${collapsedWidth}]`, // Chỉ width icon
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh transition-[left,right,width] duration-200 ease-linear md:flex",
          `w-[${expandedWidth}]`, // Mặc định là chiều rộng mở rộng
          side === "left"
            ? `left-0 group-data-[collapsible=offcanvas]:left-[calc(${expandedWidth}*-1)]` // Kéo ra ngoài màn hình
            : `right-0 group-data-[collapsible=offcanvas]:right-[calc(${expandedWidth}*-1)]`,
          // Điều chỉnh padding cho floating và inset variants.
          variant === "floating" || variant === "inset"
            ? `p-2 group-data-[collapsible=icon]:w-[calc(${collapsedWidth}+theme(spacing.4)+2px)]` // Width icon + padding + border
            : `group-data-[collapsible=icon]:w-[${collapsedWidth}] group-data-[side=left]:border-r group-data-[side=right]:border-l`,
          className,
        )}
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
