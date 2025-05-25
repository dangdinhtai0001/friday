import React from "react";
import {
  CollapsedSidebarItem as CollapsedSidebarItemType,
  DropdownItemType as DropdownItemTypeType,
  ExpandedSidebarItem as ExpandedSidebarItemType,
  SidebarSubMenuItem as SidebarSubMenuItemType,
  // Đảm bảo đường dẫn import này chính xác và các type gốc được định nghĩa đúng:
  // Ví dụ: LinkMenuItem trong SidebarSubMenuItemType có 'link: string;'
  // và DropdownLink trong DropdownItemTypeType có 'link?: string;'
} from "@/components/templates/app-layout";

/**
 * Interface cho một mục trong menu App Layout.
 * 'children' thay thế cho 'nestedItems' và 'submenuItems'.
 */
export interface AppLayoutMenuItem {
  id: string;
  type: "link" | "collapsible" | "submenu" | "separator" | "label";
  text: string;
  icon?: string | React.ReactNode;
  link?: string;
  // Các mục con cho cả loại "collapsible" và "submenu"
  children?: AppLayoutMenuItem[];
  shortcut?: string; // Phím tắt, thường dùng cho dropdown items
}

// Định nghĩa một kiểu trả về có điều kiện cho createTypedLinkItem
type CreateTypedLinkItemReturn<T extends "expanded" | "dropdown"> =
  T extends "expanded" ? SidebarSubMenuItemType : DropdownItemTypeType;

/**
 * Tạo một mục liên kết (link item) với kiểu dữ liệu phù hợp cho ngữ cảnh mở rộng hoặc dropdown.
 * Giúp giảm trùng lặp logic tạo link item.
 * @param item Mục menu AppLayoutMenuItem gốc.
 * @param context Ngữ cảnh sử dụng ('expanded' cho sidebar mở rộng, 'dropdown' cho dropdown của sidebar thu gọn).
 * @returns Mục link đã được định dạng (kiểu cụ thể tùy thuộc vào 'context').
 */
function createTypedLinkItem<T extends "expanded" | "dropdown">(
  item: AppLayoutMenuItem,
  context: T,
): CreateTypedLinkItemReturn<T> {
  const commonLinkProperties = {
    type: "link" as const,
    text: item.text,
    link: item.link ?? `#${item.id}`, // Điều này đảm bảo 'link' luôn là một chuỗi
    icon: item.icon,
  };

  if (context === "dropdown") {
    // Khi context là 'dropdown', kiểu trả về là DropdownItemTypeType
    return {
      ...commonLinkProperties,
      shortcut: item.shortcut,
    } as CreateTypedLinkItemReturn<T>; // Ép kiểu tường minh để TypeScript hiểu
  } else {
    // context === "expanded"
    // Khi context là 'expanded', kiểu trả về là SidebarSubMenuItemType
    return commonLinkProperties as CreateTypedLinkItemReturn<T>; // Ép kiểu tường minh để TypeScript hiểu
  }
}

/**
 * Chuyển đổi một AppLayoutMenuItem thành SidebarSubMenuItemType cho sidebar mở rộng.
 * Xử lý các loại 'link' và 'collapsible'.
 * @param item Mục menu AppLayoutMenuItem gốc.
 * @returns SidebarSubMenuItemType hoặc null nếu không thể chuyển đổi.
 */
function convertAppLayoutItemToExpandedSubItem(
  item: AppLayoutMenuItem,
): SidebarSubMenuItemType | null {
  switch (item.type) {
    case "link":
      // Tại đây, TypeScript biết createTypedLinkItem(item, "expanded") sẽ trả về SidebarSubMenuItemType
      return createTypedLinkItem(item, "expanded");
    case "collapsible":
      return {
        type: "collapsible",
        text: item.text,
        icon: item.icon,
        nestedItems: (item.children ?? [])
          .map(convertAppLayoutItemToExpandedSubItem)
          .filter(Boolean) as SidebarSubMenuItemType[],
      };
    default:
      return null;
  }
}

/**
 * Chuyển đổi một AppLayoutMenuItem thành ExpandedSidebarItemType.
 * Chỉ xử lý trực tiếp loại 'collapsible'. Các loại khác sẽ trả về null.
 * @param item Mục menu AppLayoutMenuItem gốc.
 * @returns ExpandedSidebarItemType hoặc null nếu không thể chuyển đổi.
 */
export function convertAppLayoutItemToExpandedItem(
  item: AppLayoutMenuItem,
): ExpandedSidebarItemType | null {
  if (item.type === "collapsible") {
    return {
      mainIcon: item.icon as string,
      mainText: item.text,
      subItems: (item.children ?? [])
        .map(convertAppLayoutItemToExpandedSubItem)
        .filter(Boolean) as SidebarSubMenuItemType[],
    };
  }
  return null;
}

/**
 * Chuyển đổi một AppLayoutMenuItem thành DropdownItemTypeType cho sidebar thu gọn.
 * Xử lý các loại 'link', 'submenu', 'separator', và 'label'.
 * @param item Mục menu AppLayoutMenuItem gốc.
 * @returns DropdownItemTypeType hoặc null nếu không thể chuyển đổi.
 */
function convertAppLayoutItemToDropdownItemType(
  item: AppLayoutMenuItem,
): DropdownItemTypeType | null {
  switch (item.type) {
    case "link":
      // Tại đây, TypeScript biết createTypedLinkItem(item, "dropdown") sẽ trả về DropdownItemTypeType
      return createTypedLinkItem(item, "dropdown");
    case "submenu":
      return {
        type: "submenu",
        text: item.text,
        icon: item.icon,
        submenuItems: (item.children ?? [])
          .map(convertAppLayoutItemToDropdownItemType)
          .filter(Boolean) as DropdownItemTypeType[],
      };
    case "separator":
      return { type: "separator" };
    case "label":
      return { type: "label", text: item.text };
    default:
      return null;
  }
}

/**
 * Chuyển đổi một AppLayoutMenuItem thành CollapsedSidebarItemType.
 * Chủ yếu xử lý các loại 'submenu' và 'link'.
 * @param item Mục menu AppLayoutMenuItem gốc.
 * @returns CollapsedSidebarItemType hoặc null nếu không thể chuyển đổi.
 */
export function convertAppLayoutItemToCollapsedItem(
  item: AppLayoutMenuItem,
): CollapsedSidebarItemType | null {
  switch (item.type) {
    case "submenu":
      return {
        iconName: item.icon as string,
        tooltip: item.text,
        dropdownItems: (item.children ?? [])
          .map(convertAppLayoutItemToDropdownItemType)
          .filter(Boolean) as DropdownItemTypeType[],
      };
    case "link":
      return {
        iconName: item.icon as string,
        tooltip: item.text,
        dropdownItems: [createTypedLinkItem(item, "dropdown")],
      };
    default:
      return null;
  }
}

/**
 * Tạo URL cho một mục menu App Layout.
 * Ưu tiên 'link' nếu có, nếu không sẽ dùng id làm hash URL.
 * @param item Mục menu AppLayoutMenuItem.
 * @returns Chuỗi URL.
 */
function generateUrlForMenuItem(item: AppLayoutMenuItem): string {
  return item.link ?? `#${item.id}`;
}

/**
 * Tạo một ánh xạ từ URL sang tên hiển thị từ một mảng các AppLayoutMenuItem.
 * Duyệt qua tất cả các mục, bao gồm cả các mục lồng nhau/submenu thông qua 'children'.
 * @param items Mảng các AppLayoutMenuItem.
 * @returns Đối tượng ánh xạ URL sang tên hiển thị.
 */
export function createUrlToDisplayNameMap(
  items: AppLayoutMenuItem[],
): Record<string, string> {
  const urlToDisplayName: Record<string, string> = {};

  /**
   * Hàm trợ giúp đệ quy để xử lý từng mục menu.
   * @param item Mục menu hiện tại để xử lý.
   */
  function processItem(item: AppLayoutMenuItem) {
    const url = generateUrlForMenuItem(item);
    if (url && item.text) {
      urlToDisplayName[url] = item.text;
    }

    item.children?.forEach(processItem);
  }

  items.forEach(processItem);
  return urlToDisplayName;
}
