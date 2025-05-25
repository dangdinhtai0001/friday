import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/organisms/sidebar2";
import SidebarCollapsibleItem, {
  SidebarSubMenuItem,
} from "./sidebar-collapsible-item";
import { useAppLayoutContext } from "../context/app-layout-context";
import { cn } from "@/composables/utils/shadcn";

/**
 * @interface ExpandedSidebarItem
 * @description Defines the data structure for a single item in the expanded sidebar.
 * It can be either a direct link or a collapsible group.
 */
export interface ExpandedSidebarItem {
  mainIcon: string | React.ReactNode;
  mainText: string;
  type: "link" | "collapsible"; // Thêm thuộc tính type
  link?: string; // Thêm thuộc tính link, chỉ dùng khi type là "link"
  subItems?: SidebarSubMenuItem[]; // subItems là tùy chọn, chỉ dùng khi type là "collapsible"
  id: string; // Thêm ID để làm key, quan trọng cho React
}

/**
 * @interface ExpandedSidebarContentProps
 * @description Defines the props for the ExpandedSidebarContent component.
 * @property {string} [sidebarLabel="Platform0"] - Optional label for the sidebar group. Defaults to "Platform0".
 */
interface ExpandedSidebarContentProps {
  sidebarLabel?: string;
}

/**
 * @component ExpandedSidebarContent
 * @description Renders the content of the sidebar when it is in its expanded state.
 * It displays a series of collapsible menu items.
 */
function ExpandedSidebarContent({ sidebarLabel }: ExpandedSidebarContentProps) {
  const {
    state: { expandedSidebarItemsData },
  } = useAppLayoutContext();

  return (
    <SidebarGroup className="h-full">
      <SidebarGroupLabel>{sidebarLabel}</SidebarGroupLabel>
      <SidebarMenu>
        {expandedSidebarItemsData.map((item) => {
          if (item.type === "link") {
            // Render là một liên kết trực tiếp
            return (
              <SidebarMenuItem
                key={item.id}
                className={cn(
                  "hover:bg-black-100/4 rounded-12 w-full cursor-pointer gap-4 p-8",
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
            // Render là một mục có thể thu gọn
            return (
              <SidebarCollapsibleItem
                key={item.id}
                mainIcon={item.mainIcon}
                mainText={item.mainText}
                subItems={item.subItems || []}
              />
            );
          }
          return null; // Không render nếu type không khớp
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export default ExpandedSidebarContent;
