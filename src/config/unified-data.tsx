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
    hideInSidebar: true,
  },
  {
    id: "home-alias", // ID khác cho đường dẫn alias
    text: "Trang chủ (alias)", // Text này có thể không hiển thị nếu hideInSidebar là true
    path: "/home",
    lazyComponent: () => import("@/pages/home"), // Cùng component Home
    hideInSidebar: true, // Không hiển thị alias này trong sidebar
    hideInBreadcrumb: true, // Cũng không hiển thị trong breadcrumb
  },
  {
    id: "theme",
    text: "Giao diện",
    icon: "palette", // Ví dụ icon
    path: "/theme", // Đường dẫn này chỉ là nhóm, không dẫn đến component nào
    type: "collapsible", // Là một mục có thể mở rộng/thu gọn
    breadcrumbText: "Giao diện",
    children: [
      {
        id: "theme-color",
        text: "Màu sắc",
        path: "/theme/color",
        lazyComponent: () => import("@/pages/theme/color"), // Import động component ColorPage
        type: "link",
        breadcrumbText: "Màu sắc",
        icon: "droplet"
      },
      {
        id: "theme-typography",
        text: "Kiểu chữ",
        path: "/theme/typography",
        lazyComponent: () => import("@/pages/theme/typography"), // Import động component TypographyPage
        type: "link",
        breadcrumbText: "Kiểu chữ",
        icon: "typography"
      },
    ],
  },
  {
    id: "components",
    text: "Components",
    icon: "puzzle", // Icon cho nhóm Components
    path: "/components", // Đường dẫn này chỉ là nhóm
    type: "collapsible",
    breadcrumbText: "Components",
    children: [
      {
        id: "components-buttons",
        text: "Buttons",
        path: "/components/buttons",
        lazyComponent: () => import("@/pages/components/buttons"), // Import component ButtonsPage
        type: "link",
        breadcrumbText: "Buttons",
        icon: "location"
      },
      {
        id: "components-icons",
        text: "Icons",
        path: "/components/icons",
        lazyComponent: () => import("@/pages/components/icons"), // Import component IconsPage
        type: "link",
        breadcrumbText: "Icons",
        icon: "star"
      },
    ],
  },
  {
    id: "system-status",
    text: "Trạng thái hệ thống",
    path: "/system-status",
    lazyComponent: () => import("@/pages/system-status"), // Import động component SystemStatusPage
    type: "link",
    breadcrumbText: "Trạng thái hệ thống",
    icon: "heart-rate-monitor"
  },
];