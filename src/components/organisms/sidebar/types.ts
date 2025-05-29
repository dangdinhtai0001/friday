// src/components/organisms/sidebar2/types.ts

import * as React from "react";

// Định nghĩa các trạng thái của Sidebar
export type SidebarState = {
  /**
   * Trạng thái mở/đóng của sidebar trên desktop.
   * @default false
   */
  open: boolean;
  /**
   * Trạng thái mở/đóng của sidebar trên mobile.
   * @default false
   */
  openMobile: boolean;
  /**
   * Vị trí của sidebar.
   * @default "left"
   */
  side: "left" | "right";
  /**
   * Biến thể hiển thị của sidebar.
   * @default "sidebar"
   */
  variant: "sidebar" | "floating" | "inset";
  /**
   * Kiểu thu gọn của sidebar khi ở trạng thái "collapsed".
   * @default "icon"
   */
  collapsible: "offcanvas" | "icon" | "none";
  /**
   * Chiều rộng của sidebar khi mở rộng (expanded).
   * @default "16rem"
   */
  expandedWidth: string;
  /**
   * Chiều rộng của sidebar khi thu gọn (collapsed).
   * @default "3rem"
   */
  collapsedWidth: string;
  /**
   * Trạng thái hiện tại của sidebar (được tính toán từ 'open').
   */
  state: "expanded" | "collapsed";
};

// Định nghĩa các hành động có thể thực hiện trên Sidebar
export type SidebarActions = {
  /**
   * Cập nhật trạng thái mở của sidebar trên desktop.
   * @param open Trạng thái mở (true) hoặc đóng (false).
   */
  setOpen: (open: boolean) => void;
  /**
   * Cập nhật trạng thái mở của sidebar trên mobile.
   * @param openMobile Trạng thái mở (true) hoặc đóng (false).
   */
  setOpenMobile: (openMobile: boolean) => void;
  /**
   * Chuyển đổi trạng thái mở/đóng của sidebar (desktop hoặc mobile tùy thuộc vào thiết bị).
   */
  toggleSidebar: () => void;
};

// Giá trị của SidebarContext
export type SidebarContextValue = {
  /**
   * Trạng thái hiện tại của sidebar.
   */
  state: SidebarState;
  /**
   * Các hành động để tương tác với sidebar.
   */
  actions: SidebarActions;
};

// Props cho SidebarProvider (root component)
export type SidebarRootProps = {
  /**
   * Trạng thái mở mặc định của sidebar khi khởi tạo.
   * @default true
   */
  defaultOpen?: boolean;
  /**
   * Chiều rộng mặc định khi sidebar mở rộng.
   * @default "16rem"
   */
  expandedWidth?: string;
  /**
   * Chiều rộng mặc định khi sidebar thu gọn.
   * @default "3rem"
   */
  collapsedWidth?: string;
  /**
   * Vị trí mặc định của sidebar.
   * @default "left"
   */
  side?: "left" | "right";
  /**
   * Biến thể hiển thị mặc định của sidebar.
   * @default "sidebar"
   */
  variant?: "sidebar" | "floating" | "inset";
  /**
   * Kiểu thu gọn mặc định của sidebar.
   * @default "icon"
   */
  collapsible?: "offcanvas" | "icon" | "none";
  /**
   * Hàm callback khi trạng thái mở của sidebar thay đổi.
   */
  onOpenChange?: (open: boolean) => void;
} & React.ComponentPropsWithoutRef<"div">; // Kế thừa các props div tiêu chuẩn

// Props cơ bản cho các component con của Sidebar
export type BaseSidebarComponentProps = {
  /**
   * Tên class CSS tùy chỉnh.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<"div">; // Có thể điều chỉnh kiểu HTMLElement tùy thuộc vào component

// Props cho SidebarMenuButton
export type SidebarMenuButtonProps = {
  /**
   * Render dưới dạng một component con.
   */
  asChild?: boolean;
  /**
   * Nội dung tooltip hiển thị khi sidebar thu gọn.
   */
  tooltip?: string | React.ComponentProps<React.ComponentType<unknown>>;
} & React.ComponentPropsWithoutRef<"button">;

// Props cho SidebarMenuAction
export type SidebarMenuActionProps = {
  /**
   * Render dưới dạng một component con.
   */
  asChild?: boolean;
  /**
   * Có hiển thị nút hành động khi hover mục menu hay không.
   * @default false
   */
  showOnHover?: boolean;
} & React.ComponentPropsWithoutRef<"button">;

// Props cho SidebarGroupLabel
export type SidebarGroupLabelProps = {
  /**
   * Render dưới dạng một component con.
   */
  asChild?: boolean;
} & React.ComponentPropsWithoutRef<"div">;

// Props cho SidebarGroupAction
export type SidebarGroupActionProps = {
  /**
   * Render dưới dạng một component con.
   */
  asChild?: boolean;
} & React.ComponentPropsWithoutRef<"button">;

// Props cho SidebarMenuSkeleton
export type SidebarMenuSkeletonProps = {
  /**
   * Có hiển thị biểu tượng skeleton hay không.
   * @default false
   */
  showIcon?: boolean;
} & React.ComponentPropsWithoutRef<"div">;

// Props cho SidebarMenuSubButton
export type SidebarMenuSubButtonProps = {
  /**
   * Render dưới dạng một component con.
   */
  asChild?: boolean;
  /**
   * Kích thước của nút menu con.
   * @default "md"
   */
  size?: "sm" | "md";
  /**
   * Cho biết mục menu con này có đang hoạt động hay không.
   */
  isActive?: boolean;
} & React.ComponentPropsWithoutRef<"a">; // Sử dụng 'a' vì nó thường là link
