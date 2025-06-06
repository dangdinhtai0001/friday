import { UnifiedSidebarRouteItem } from "./types";

/**
 * @description Mảng dữ liệu UnifiedSidebarRouteItem ban đầu, định nghĩa cấu trúc routes và sidebar.
 * Sử dụng để generate RouteObject cho React Router và các cấu trúc cho Expanded/Collapsed Sidebar.
 */
export const initialUnifiedRoutes: UnifiedSidebarRouteItem[] = [
  {
    id: "home",
    text: "Trang chủ",
    path: "/",
    lazyComponent: () => import("@/pages/home"), // Import động component Home
    type: "link", // Đây là một liên kết trong sidebar
    breadcrumbText: "Trang chủ",
    hideInSidebar: true, // Thường không hiển thị trang chủ trong sidebar nếu có logo/link riêng
    tooltip: "Đi tới trang chủ", 
  },
  {
    id: "home-alias", // ID khác cho đường dẫn alias
    text: "Trang chủ (alias)", // Text này có thể không hiển thị nếu hideInSidebar là true
    path: "/home",
    lazyComponent: () => import("@/pages/home"), // Cùng component Home
    hideInSidebar: true, // Không hiển thị alias này trong sidebar
    hideInBreadcrumb: true, // Cũng không hiển thị trong breadcrumb
    tooltip: "Trang chủ dự phòng", 
  },
  {
    id: "theme",
    text: "Giao diện",
    icon: "palette", // Ví dụ icon
    path: "/theme", // Đường dẫn này chỉ là nhóm, không dẫn đến component nào
    type: "collapsible", // Là một mục có thể mở rộng/thu gọn
    breadcrumbText: "Giao diện",
    tooltip: "Quản lý giao diện người dùng", 
    children: [
      {
        id: "theme-color",
        text: "Màu sắc",
        path: "/theme/color",
        lazyComponent: () => import("@/pages/theme/color"), // Import động component ColorPage
        type: "link",
        breadcrumbText: "Màu sắc",
        icon: "droplet",
        tooltip: "Cấu hình bảng màu", 
      },
      {
        id: "theme-typography",
        text: "Kiểu chữ",
        path: "/theme/typography",
        lazyComponent: () => import("@/pages/theme/typography"), // Import động component TypographyPage
        type: "link",
        breadcrumbText: "Kiểu chữ",
        icon: "typography",
        tooltip: "Cấu hình font chữ và văn bản", 
      },
    ],
  },
  {
    id: "components-label", // ID cho label
    text: "Components & UI", // Text cho label
    type: "label", // Đây là một label
  },
  {
    id: "components",
    text: "Components",
    icon: "puzzle", // Icon cho nhóm Components
    path: "/components", // Đường dẫn này chỉ là nhóm
    type: "collapsible",
    breadcrumbText: "Components",
    tooltip: "Xem và thử nghiệm các thành phần UI", 
    children: [
      {
        id: "components-buttons",
        text: "Buttons",
        path: "/components/buttons",
        lazyComponent: () => import("@/pages/components/buttons"), 
        type: "link",
        breadcrumbText: "Buttons",
        icon: "location",
        tooltip: "Các loại nút bấm", 
      },
      {
        id: "components-icons",
        text: "Icons",
        path: "/components/icons",
        lazyComponent: () => import("@/pages/components/icons"), 
        type: "link",
        breadcrumbText: "Icons",
        icon: "star",
        tooltip: "Thư viện biểu tượng", 
      },
      {
        id: "components-grid-layout",
        text: "Grid layout",
        path: "/components/grid-layout",
        lazyComponent: () => import("@/pages/components/grid-layout"), 
        type: "link",
        breadcrumbText: "Grid layout",
        icon: "layout",
        tooltip: "layout linh hoạt", 
      },
      {
        id: "components-form",
        text: "Form",
        path: "/components/form",
        lazyComponent: () => import("@/pages/components/form"), 
        type: "link",
        breadcrumbText: "Form",
        icon: "forms",
        tooltip: "Form", 
      },
      {
        id: "components-datatable",
        text: "Data table",
        path: "/components/data-table",
        lazyComponent: () => import("@/pages/components/data-table"), 
        type: "link",
        breadcrumbText: "Data table",
        icon: "table",
        tooltip: "Data table", 
      },
    ],
  },
  {
    id: "pages-label", // ID cho label
    text: "Pages", // Text cho label
    type: "label", // Đây là một label
  },
  {
    id: "system-status",
    text: "Trạng thái hệ thống",
    path: "/system-status",
    lazyComponent: () => import("@/pages/system-status"), // Import động component SystemStatusPage
    type: "link",
    breadcrumbText: "Trạng thái hệ thống",
    icon: "heart-rate-monitor",
    tooltip: "Kiểm tra tình trạng hoạt động của hệ thống", 
  },
];
