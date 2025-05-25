import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/organisms/sidebar2";
import SidebarDropdownItem, { DropdownItemType } from "./sidebar-dropdown-item";
import { useAppLayoutContext } from "../context/app-layout-context";
import React from "react";

/**
 * @interface CollapsedSidebarItem
 * @description Defines the data structure for a single item in the collapsed sidebar.
 * It can be either a direct link button or a dropdown menu.
 */
export interface CollapsedSidebarItem {
  iconName: string | React.ReactNode;
  tooltip: string;
  type: "link" | "dropdown"; // Thêm thuộc tính type
  link?: string; // Chỉ dùng khi type là "link"
  dropdownItems?: DropdownItemType[]; // Chỉ dùng khi type là "dropdown"
  id: string; // Thêm ID để làm key
}

/**
 * @component CollapsedSidebarContent
 * @description Renders the content of the sidebar when it is in its collapsed state.
 * It displays a series of dropdown menus represented by icons.
 */
function CollapsedSidebarContent() {
  const {
    state: { collapsedSidebarItemsData },
  } = useAppLayoutContext();
  return (
    <SidebarGroup className="h-full">
      <SidebarMenu>
        {collapsedSidebarItemsData.map((item) => {
          if (item.type === "link") {
            // Render là một nút liên kết trực tiếp
            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  className="hover:bg-black-100/4 rounded-12 flex aspect-square w-full justify-center"
                  // text={item.tooltip}
                  link={item.link}
                  icon={item.iconName}
                />
              </SidebarMenuItem>
            );
          } else if (item.type === "dropdown") {
            // Render là một dropdown menu
            return (
              <SidebarDropdownItem
                key={item.id}
                iconName={item.iconName}
                dropdownItems={item.dropdownItems || []} // Đảm bảo dropdownItems luôn là mảng
                tooltip={item.tooltip}
              />
            );
          }
          return null;
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

CollapsedSidebarContent.displayName = "CollapsedSidebarContent";
export default CollapsedSidebarContent;
