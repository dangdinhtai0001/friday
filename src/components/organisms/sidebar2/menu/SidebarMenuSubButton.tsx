// src/components/organisms/sidebar2/menu/SidebarMenuSubButton.tsx

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/composables/utils/shadcn"; // Đảm bảo đường dẫn chính xác
import { IconLoader } from "@/components/atoms/icon-loader";
import { Link } from "react-router";

interface SidebarMenuSubButtonProps
  extends React.ComponentPropsWithoutRef<"div"> {
  // Sử dụng ComponentPropsWithoutRef
  asChild?: boolean;
  isActive?: boolean;
  icon?: React.ReactNode | string;
  text?: string | React.ReactNode;
  link?: string;
}

const SidebarMenuSubButton = React.forwardRef<
  HTMLDivElement,
  SidebarMenuSubButtonProps
>(
  (
    {
      asChild = false,
      isActive = false,
      className,
      icon,
      text,
      link,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "div";

    // Xử lý icon: Nếu là string thì dùng IconLoader, nếu không thì render trực tiếp
    const renderIcon = () => {
      if (!icon) return null;
      return typeof icon === "string" ? <IconLoader name={icon} className="size-20"/> : icon;
    };

    // Xử lý text: Nếu có link thì wrap vào <Link>, nếu không thì render trực tiếp
    const renderText = () => {
      if (!text) return null;

      const textContent = typeof text === "string" ? <span className="w-full justify-start flex" >{text}</span> : text;

      return link ? <Link to={link} className="block w-full">{textContent}</Link> : textContent;
    };

    return (
      <Comp
        ref={ref}
        data-slot="sidebar-menu-sub-button"
        data-active={isActive}
        className={cn(
          "flex h-full cursor-pointer items-center gap-4", // CSS cơ bản, đơn giản hóa
          className, // Các lớp CSS tùy chỉnh
        )}
        {...props}
      >
        <div className="flex cursor-pointer items-center justify-start gap-4 ">
          {renderIcon()}
          {renderText()}
          {children}
        </div>
      </Comp>
    );
  },
);

SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export { SidebarMenuSubButton };
