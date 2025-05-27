// src/components/organisms/sidebar2/menu/SidebarMenuButton.tsx

import * as React from "react";
import { Slot } from "@radix-ui/react-slot"; // Cần cài đặt @radix-ui/react-slot nếu chưa có
import { cn } from "@/composables/utils/shadcn"; // Đảm bảo đường dẫn này chính xác
import { IconLoader } from "@/components/atoms/icon-loader";
import { Link } from "react-router";

interface SidebarMenuButtonProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
  isActive?: boolean;
  icon?: React.ReactNode | string;
  text?: string | React.ReactNode;
  link?: string;
}

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(
  (
    {
      className,
      asChild = false,
      isActive = false,
      icon,
      text,
      link,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    // Xử lý icon: Nếu là string thì dùng IconLoader, nếu không thì render trực tiếp
    const renderIcon = () => {
      if (!icon) return null;
      return typeof icon === "string" ? (
        <IconLoader name={icon} className="size-20"/>
      ) : (
        icon
      );
    };

    // Xử lý text: Nếu có link thì wrap vào <Link>, nếu không thì render trực tiếp
    const renderText = () => {
      if (!text) return null;
      return typeof text === "string" ? (
        <span >{text}</span>
      ) : (
        text
      );
    };

    const buttonContent = (
      <div className={cn(
          "flex w-full cursor-pointer items-center gap-8",
          className,
        )}>
        {renderIcon()}
        {renderText()}
        {children}
      </div>
    );

    return (
      <Comp
        ref={ref} // Đảm bảo ref được truyền xuống
        data-slot="sidebar-menu-button"
        data-sidebar="menu-button"
        data-active={isActive} // Dùng data-active để xử lý style khi active
        className={cn(
          "flex w-full cursor-pointer items-center gap-8",
          className,
        )}
        {...props}
      >
        {link ? (
          <Link
            className="flex h-full w-full items-center justify-center"
            to={link}
          >
            {buttonContent}
          </Link>
        ) : (
          buttonContent
        )}
      </Comp>
    );
  },
);

SidebarMenuButton.displayName = "SidebarMenuButton";

export { SidebarMenuButton };
