import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/organisms/sidebar";
import SidebarCollapsibleItem from "./expanded-sidebar-item";
import { useAppLayoutContext } from "../context/app-layout-context";
import { cn } from "@/composables/utils/shadcn";

/**
 * @component ExpandedSidebarContent
 * @description Renders the content of the sidebar when it is in its expanded state.
 * It displays a series of collapsible menu items.
 */
function ExpandedSidebarContent() {
  const {
    state: { expandedSidebarItemsData },
  } = useAppLayoutContext();

  return (
    <SidebarGroup className="h-full">
      <SidebarMenu>
        {expandedSidebarItemsData.map((item) => {
          if (item.type === "link") {
            return (
              <SidebarMenuItem
                key={item.id}
                className={cn(
                  "hover:bg-black-4 rounded-12 w-full cursor-pointer gap-4 p-8",
                  "flex flex-col items-start",
                )}
              >
                <SidebarMenuButton
                  className="w-full"
                  icon={item.mainIcon}
                  text={item.mainText}
                  link={item.link}
                />
              </SidebarMenuItem>
            );
          } else if (item.type === "collapsible") {
            return (
              <SidebarCollapsibleItem
                key={item.id}
                mainIcon={item.mainIcon}
                mainText={item.mainText}
                subItems={item.subItems || []}
              />
            );
          } else if (item.type === "label") {
            // Render label
            return (
              <SidebarGroupLabel key={item.id}>
                {item.mainText}
              </SidebarGroupLabel>
            );
          }
          return null; // Không render nếu type không khớp
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export default ExpandedSidebarContent;
