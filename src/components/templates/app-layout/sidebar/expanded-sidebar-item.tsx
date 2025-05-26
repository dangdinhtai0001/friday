import {
  MCCollapsiable,
  MCCollapsibleContent,
  MCCollapsibleTrigger,
} from "@/components/atoms/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/organisms/sidebar2";
import {
  LinkMenuItem,
  NestedCollapsibleMenuItem,
  SidebarCollapsibleProps,
  SidebarSubMenuItemProps,
} from "../types/sidebar-menu.types";
import { IconLoader } from "@/components/atoms/icon-loader";

/**
 * Renders a single submenu item, which can be either a link or a nested collapsible.
 */
function RenderSidebarSubMenuItem({ item }: SidebarSubMenuItemProps) {
  if (item.type === "link") {
    const linkItem = item as LinkMenuItem; // Type casting for better type safety

    return (
      <SidebarMenuSubItem>
        <SidebarMenuSubButton
          asChild
          className="hover:bg-black-100/4 rounded-12 w-full gap-4 p-8 "
          text={linkItem.text}
          link={linkItem.link}
          icon={linkItem.icon}
        />
      </SidebarMenuSubItem>
    );
  } else if (item.type === "collapsible") {
    const collapsibleItem = item as NestedCollapsibleMenuItem;

    return (
      <SidebarMenuSubItem>
        <MCCollapsiable className="w-full">
          <MCCollapsibleTrigger
            asChild
            className="hover:bg-black-100/4 rounded-12 w-full gap-4 p-8"
            iconPosition="start"
          >
            <SidebarMenuSubButton
              asChild
              icon={collapsibleItem.icon}
              text={collapsibleItem.text}
            />
          </MCCollapsibleTrigger>

          <MCCollapsibleContent className="px-1">
            <SidebarMenuSub className="gap-4">
              {collapsibleItem.nestedItems?.map((nestedItem, nestedIndex) => (
                // RECURSION HERE: Calling RenderSidebarSubMenuItem for each nested item
                <RenderSidebarSubMenuItem key={nestedIndex} item={nestedItem} />
              ))}
            </SidebarMenuSub>
          </MCCollapsibleContent>
        </MCCollapsiable>
      </SidebarMenuSubItem>
    );
  }

  return null; // Should not happen based on the type definition
}

/**
 * A component that renders a collapsible item in the sidebar, which can contain nested sub-items.
 */
function SidebarCollapsible({
  mainIcon,
  mainText,
  subItems,
}: SidebarCollapsibleProps) {
  return (
    <>
      <MCCollapsiable defaultOpen>
        <SidebarMenuItem className="flex flex-col items-start">
          <MCCollapsibleTrigger
            asChild
            className="hover:bg-black-100/4 rounded-12 w-full gap-4 p-8 cursor-pointer "
            iconPosition="start"
            customIcon={<IconLoader name={"chevron-right"} className="size-16 text-black-20" />}
          >
            <SidebarMenuButton icon={mainIcon} text={mainText} />
          </MCCollapsibleTrigger>

          <MCCollapsibleContent className="px-4">
            <SidebarMenuSub className="gap-4 px-4">
              {subItems.map((item, index) => (
                <RenderSidebarSubMenuItem key={index} item={item} />
              ))}
            </SidebarMenuSub>
          </MCCollapsibleContent>
        </SidebarMenuItem>
      </MCCollapsiable>
    </>
  );
}

export default SidebarCollapsible;