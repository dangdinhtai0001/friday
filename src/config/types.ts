import React from "react";

/**
 * @interface UnifiedSidebarRouteItem
 * @description Định nghĩa một cấu trúc dữ liệu thống nhất, có khả năng chuyển đổi thành
 * các đối tượng RouteObject (React Router), CollapsedSidebarItem, hoặc ExpandedSidebarItem.
 * Mục tiêu là cung cấp một nguồn dữ liệu duy nhất cho việc quản lý route và hiển thị sidebar.
 */
export interface UnifiedSidebarRouteItem {
  /**
   * @property {string} id - Mã định danh duy nhất cho mục này.
   * Quan trọng để quản lý trạng thái, ánh xạ và sử dụng làm key trong các danh sách React.
   */
  id: string;

  /**
   * @property {string} text - Văn bản chính hiển thị cho mục.
   * Ví dụ: "Dashboard", "Sản phẩm", "Cài đặt".
   * Sử dụng làm `mainText` trong ExpandedSidebarItem, `text` trong DropdownItemType,
   * và có thể làm tiêu đề cho các route.
   */
  text: string;

  /**
   * @property {string | React.ReactNode} [icon] - Icon tùy chọn đi kèm với mục.
   * Có thể là tên chuỗi của icon (ví dụ: "home", "settings") hoặc một component React.
   * Sử dụng làm `mainIcon` trong ExpandedSidebarItem, `iconName` trong CollapsedSidebarItem (cấp cao nhất),
   * và `icon` trong các DropdownItemType/SidebarSubMenuItem.
   */
  icon?: string | React.ReactNode;

  /**
   * @property {"link" | "collapsible" | "submenu" | "separator" | "label"} [type] - Kiểu của mục.
   * Giúp xác định cách diễn giải và chuyển đổi mục này sang các cấu trúc khác:
   * - "link": Một liên kết điều hướng đơn giản.
   * - "collapsible": Một mục có thể mở rộng/thu gọn (thường dùng trong Expanded Sidebar).
   * - "submenu": Một mục kích hoạt menu thả xuống (thường dùng trong Collapsed Sidebar).
   * - "separator": Một đường phân cách trong menu thả xuống.
   * - "label": Một nhãn tiêu đề trong menu thả xuống.
   */
  type?: "link" | "collapsible" | "submenu" | "separator" | "label";

  /**
   * @property {UnifiedSidebarRouteItem[]} [children] - Các mục con lồng ghép.
   * Hỗ trợ cấu trúc cây cho routes, các menu con, hoặc các mục sidebar con.
   * Ánh xạ tới `children` trong RouteObject, `subItems` trong ExpandedSidebarItem,
   * `dropdownItems` hoặc `submenuItems` trong CollapsedSidebarItem.
   */
  children?: UnifiedSidebarRouteItem[];

  // --- Thuộc tính liên quan đến React Router và Navigation ---

  /**
   * @property {string} [path] - Đường dẫn URL cho route.
   * Sử dụng làm `path` trong RouteObject và `link` trong LinkMenuItem/DropdownLink.
   */
  path?: string;

  /**
   * @property {React.ReactNode} [element] - Component React sẽ được render khi route này được kích hoạt.
   * Sử dụng cho các component được import trực tiếp (không lazy load).
   */
  element?: React.ReactNode;

  /**
   * @property {() => Promise<{ default: React.ComponentType<unknown> }>} [lazyComponent] - Hàm dùng để lazy load component.
   * Khi tồn tại, sẽ sử dụng `React.lazy()` để tạo `element` cho RouteObject.
   * Ví dụ: `() => import('../pages/MyComponent')`.
   */
  lazyComponent?: () => Promise<{ default: React.ComponentType<unknown> }>;

  /**
   * @property {string} [link] - Liên kết URL tường minh cho các mục menu dạng link.
   * Có thể trùng lặp với `path` nhưng rõ ràng hơn khi ánh xạ tới `LinkMenuItem` và `DropdownLink`.
   */
  link?: string;

  // --- Thuộc tính liên quan đến Sidebar Display ---

  /**
   * @property {boolean} [hideInSidebar] - Nếu là `true`, mục này sẽ không được hiển thị
   * trong cả sidebar mở rộng và sidebar thu gọn.
   * Hữu ích cho các route chỉ được truy cập qua link trực tiếp hoặc không cần hiển thị trên menu.
   */
  hideInSidebar?: boolean;

  /**
   * @property {string} [tooltip] - Văn bản hiển thị khi di chuột (hover) vào mục.
   * Thường được sử dụng cho `tooltip` trong `CollapsedSidebarItem`.
   */
  tooltip?: string;

  /**
   * @property {string} [shortcut] - Phím tắt tùy chọn cho một mục.
   * Thường được sử dụng cho `shortcut` trong `DropdownLink` của CollapsedSidebarItem.
   */
  shortcut?: string;

  // --- Thuộc tính liên quan đến Breadcrumbs ---

  /**
   * @property {string} [breadcrumbText] - Văn bản tùy chọn hiển thị trong breadcrumb.
   * Nếu không được cung cấp, thuộc tính `text` của mục sẽ được sử dụng.
   */
  breadcrumbText?: string;

  /**
   * @property {boolean} [hideInBreadcrumb] - Nếu là `true`, mục này sẽ bị bỏ qua
   * khi tạo chuỗi breadcrumb.
   * Hữu ích cho các mục trung gian hoặc không muốn hiển thị trong đường dẫn điều hướng.
   */
  hideInBreadcrumb?: boolean;
}
