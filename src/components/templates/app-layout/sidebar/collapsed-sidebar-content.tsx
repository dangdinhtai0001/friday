import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/organisms/sidebar2";
import { useAppLayoutContext } from "../context/app-layout-context";
import SidebarDropdownItem from "./collapsed-sidebar-item";

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
