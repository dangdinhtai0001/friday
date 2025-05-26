import React, { Suspense } from "react";
import { Navigate, RouteObject } from "react-router"; // Sửa lại import RouteObject từ react-router-dom nếu cần
import { UnifiedSidebarRouteItem } from "./types"; // Giả sử types.ts chứa tất cả các interface, bao gồm RouteObject đã mở rộng
import {
  CollapsedSidebarItem,
  DropdownItemType,
  DropdownLabelItem,
  DropdownLink,
  DropdownSeparatorItem,
  DropdownSubmenu,
  ExpandedSidebarItem,
  LinkMenuItem,
  NestedCollapsibleMenuItem,
  SidebarSubMenuItem,
} from "@/components/templates/app-layout";

/**
 * @description Hàm đệ quy để chuyển đổi mảng UnifiedSidebarRouteItem thành mảng React Router RouteObject.
 * Xử lý lazy loading, lồng ghép routes và metadata cho breadcrumb.
 * Đồng thời xử lý redirect cho các route cha không có element.
 * @param {UnifiedSidebarRouteItem[]} unifiedItems - Mảng các mục điều hướng thống nhất.
 * @returns {RouteObject[]} Mảng các đối tượng RouteObject.
 */
export function convertUnifiedToRouteObjects(
  unifiedItems: UnifiedSidebarRouteItem[],
): RouteObject[] {
  return unifiedItems
    .filter((item) => item.path) // Chỉ lọc những item có path
    .map((item) => {
      let routeElement: React.ReactNode | undefined;
      let hasDirectElementOrLazy: boolean = false; // Cờ để kiểm tra xem item có element/lazyComponent trực tiếp không

      // Xử lý element/lazyComponent
      if (item.lazyComponent) {
        const LazyComponent = React.lazy(item.lazyComponent);
        routeElement = (
          <Suspense fallback={<div>Đang tải...</div>}>
            <LazyComponent />
          </Suspense>
        );
        hasDirectElementOrLazy = true;
      } else if (item.element) {
        routeElement = item.element;
        hasDirectElementOrLazy = true;
      }

      // Xử lý handle cho breadcrumb
      let breadcrumbValue: string | boolean | undefined;
      if (item.hideInBreadcrumb) {
        breadcrumbValue = false;
      } else if (item.breadcrumbText) {
        breadcrumbValue = item.breadcrumbText;
      } else {
        breadcrumbValue = item.text;
      }

      const route: RouteObject = {
        id: item.id,
        path: item.path,
        element: routeElement,
        handle: {
          breadcrumb: breadcrumbValue,
          icon: item.icon, // **Thêm icon vào handle ở đây**
        },
      };

      // Xử lý các route con
      if (item.children && item.children.length > 0) {
        // Đệ quy cho các item con
        const convertedChildren = convertUnifiedToRouteObjects(item.children);

        // --- Bổ sung logic xử lý redirect cho route cha không có element và có route con ---
        // Nếu route cha không có element trực tiếp (ví dụ: /theme)
        // và nó có ít nhất một route con hợp lệ, thêm một redirect mặc định đến route con đầu tiên
        if (!hasDirectElementOrLazy && convertedChildren.length > 0) {
          // Tìm route con đầu tiên có path không rỗng và không phải là index route
          // Mục tiêu là tìm route con đầu tiên mà chúng ta muốn redirect tới
          const firstMeaningfulChild = convertedChildren.find(
            (child) => child.path && child.path !== "*" && !child.index,
          );

          if (firstMeaningfulChild && firstMeaningfulChild.path) {
            // Thêm một index route để chuyển hướng khi path cha khớp chính xác
            const defaultRedirectRoute: RouteObject = {
              index: true, // Đây là index route cho route cha
              element: <Navigate to={firstMeaningfulChild.path} replace />, // Điều hướng tương đối
            };
            // Thêm route redirect vào đầu mảng con để ưu tiên khớp Index Route trước các route con khác
            route.children = [defaultRedirectRoute, ...convertedChildren];
          } else {
            // Nếu không tìm thấy route con hợp lệ để redirect, chỉ sử dụng convertedChildren
            route.children = convertedChildren;
          }
        } else {
          // Nếu có element trực tiếp hoặc không có children, chỉ sử dụng convertedChildren
          route.children = convertedChildren;
        }
      }

      return route;
    });
}

// ------

/**
 * @description Hàm đệ quy để chuyển đổi các mục UnifiedSidebarRouteItem thành SidebarSubMenuItem.
 * Đây là hàm phụ trợ cho convertUnifiedToExpandedSidebarItems.
 * @param {UnifiedSidebarRouteItem[]} unifiedItems - Mảng các mục UnifiedSidebarRouteItem.
 * @returns {SidebarSubMenuItem[]} Mảng các SidebarSubMenuItem đã được chuyển đổi.
 */
function convertToSidebarSubMenuItems(
  unifiedItems: UnifiedSidebarRouteItem[],
): SidebarSubMenuItem[] {
  const sidebarItems: SidebarSubMenuItem[] = [];

  for (const item of unifiedItems) {
    // Bỏ qua các mục được đánh dấu là ẩn trong sidebar
    if (item.hideInSidebar) {
      continue;
    }

    // Nếu item có children và được đánh dấu là "collapsible" hoặc là một nhóm
    if (
      item.children &&
      item.children.length > 0 &&
      item.type === "collapsible"
    ) {
      const nestedItem: NestedCollapsibleMenuItem = {
        type: "collapsible",
        text: item.text,
        icon: item.icon,
        nestedItems: convertToSidebarSubMenuItems(item.children), // Gọi đệ quy cho các mục con
      };
      sidebarItems.push(nestedItem);
    }
    // Nếu item là một "link" và có link/path
    else if (item.type === "link" && (item.link || item.path)) {
      const linkItem: LinkMenuItem = {
        type: "link",
        text: item.text,
        link: item.link || item.path || "#", // Ưu tiên item.link, sau đó là item.path, cuối cùng là '#'
        icon: item.icon,
      };
      sidebarItems.push(linkItem);
    }
    // Các trường hợp khác (separator, label) sẽ bị bỏ qua trong expanded sidebar ở cấp độ này
    // vì chúng không có cấu trúc tương ứng trực tiếp cho SidebarSubMenuItem.
  }

  return sidebarItems;
}

/**
 * @description Chuyển đổi mảng UnifiedSidebarRouteItem thành mảng ExpandedSidebarItem cho sidebar mở rộng.
 * Bao gồm cả các mục chính (top-level) là link hoặc nhóm (collapsible).
 * @param {UnifiedSidebarRouteItem[]} unifiedItems - Mảng các mục điều hướng thống nhất.
 * @returns {ExpandedSidebarItem[]} Mảng các ExpandedSidebarItem.
 */
export function convertUnifiedToExpandedSidebarItems(
  unifiedItems: UnifiedSidebarRouteItem[],
): ExpandedSidebarItem[] {
  const expandedSidebarItems: ExpandedSidebarItem[] = [];

  for (const item of unifiedItems) {
    if (item.hideInSidebar) {
      continue;
    }

    if (item.type === "collapsible" && item.text) {
      // Collapsible items cần text
      const subItems = convertToSidebarSubMenuItems(item.children || []);
      if (subItems.length > 0) {
        // Chỉ thêm nhóm nếu có ít nhất một mục con hợp lệ
        expandedSidebarItems.push({
          id: item.id,
          mainIcon: item.icon, // icon có thể là undefined nếu không có
          mainText: item.text,
          type: "collapsible",
          subItems: subItems,
        });
      }
    } else if (item.type === "link" && item.path && item.text) {
      // Link items cần path, text
      expandedSidebarItems.push({
        id: item.id,
        mainIcon: item.icon, // icon có thể là undefined
        mainText: item.text,
        type: "link",
        link: item.link || item.path,
      });
    } else if (item.type === "label" && item.text) {
      // Label items chỉ cần text
      expandedSidebarItems.push({
        id: item.id,
        mainIcon: item.icon, // icon của label có thể là undefined
        mainText: item.text,
        type: "label",
      });
    }
    // Các type khác như 'separator' ở cấp top-level sẽ bị bỏ qua
  }

  return expandedSidebarItems;
}

//  --------

/**
 * @description Hàm đệ quy để chuyển đổi các mục UnifiedSidebarRouteItem thành DropdownItemType.
 * Đây là hàm phụ trợ cho convertUnifiedToCollapsedSidebarItems.
 * @param {UnifiedSidebarRouteItem[]} unifiedItems - Mảng các mục UnifiedSidebarRouteItem.
 * @returns {DropdownItemType[]} Mảng các DropdownItemType đã được chuyển đổi.
 */
function convertToDropdownItems(
  unifiedItems: UnifiedSidebarRouteItem[],
): DropdownItemType[] {
  const dropdownItems: DropdownItemType[] = [];

  for (const item of unifiedItems) {
    if (item.hideInSidebar) {
      continue;
    }

    switch (item.type) {
      case "link":
        if (item.link || item.path) {
          const dropdownLink: DropdownLink = {
            type: "link",
            text: item.text,
            icon: item.icon,
            link: item.link || item.path,
            shortcut: item.shortcut,
          };
          dropdownItems.push(dropdownLink);
        }
        break;

      case "submenu":
      case "collapsible":
        if (item.children && item.children.length > 0) {
          const submenuItems = convertToDropdownItems(item.children);
          if (submenuItems.length > 0) {
            const dropdownSubmenu: DropdownSubmenu = {
              type: "submenu",
              text: item.text,
              icon: item.icon,
              submenuItems: submenuItems,
            };
            dropdownItems.push(dropdownSubmenu);
          }
        }
        break;

      case "separator": {
        const separator: DropdownSeparatorItem = { type: "separator" };
        dropdownItems.push(separator);
        break;
      }

      case "label": {
        const label: DropdownLabelItem = {
          type: "label",
          text: item.text,
        };
        dropdownItems.push(label);
        break;
      }
    }
  }

  return dropdownItems;
}

/**
 * @description Chuyển đổi mảng UnifiedSidebarRouteItem thành mảng CollapsedSidebarItem cho sidebar thu gọn.
 * Bao gồm cả các mục chính (top-level) là link hoặc dropdown.
 * @param {UnifiedSidebarRouteItem[]} unifiedItems - Mảng các mục điều hướng thống nhất.
 * @returns {CollapsedSidebarItem[]} Mảng các CollapsedSidebarItem.
 */
export function convertUnifiedToCollapsedSidebarItems(
  unifiedItems: UnifiedSidebarRouteItem[],
): CollapsedSidebarItem[] {
  const collapsedSidebarItems: CollapsedSidebarItem[] = [];

  for (const item of unifiedItems) {
    if (item.hideInSidebar) {
      continue;
    }

    // Mỗi item cấp cao nhất có icon và text sẽ trở thành một CollapsedSidebarItem
    if (item.icon && item.text) {
      if (item.type === "link" && (item.link || item.path)) {
        // Đây là một liên kết cấp cao nhất, sẽ là một nút trực tiếp
        collapsedSidebarItems.push({
          id: item.id, // Thêm ID
          iconName: item.icon,
          tooltip: item.tooltip || item.text,
          type: "link",
          link: item.link || item.path,
          // Không có dropdownItems cho type "link"
        });
      } else if (item.type === "collapsible" || item.type === "submenu") {
        // Đây là một mục nhóm/submenu, sẽ là một dropdown
        const dropdownItems = convertToDropdownItems(item.children || []);
        // Chỉ thêm dropdown nếu có ít nhất một mục con hợp lệ
        if (dropdownItems.length > 0) {
          collapsedSidebarItems.push({
            id: item.id, // Thêm ID
            iconName: item.icon,
            tooltip: item.tooltip || item.text,
            type: "dropdown",
            dropdownItems: dropdownItems,
          });
        }
      }
      // Các type khác như 'separator', 'label' ở cấp top-level sẽ bị bỏ qua
    }
  }

  return collapsedSidebarItems;
}
