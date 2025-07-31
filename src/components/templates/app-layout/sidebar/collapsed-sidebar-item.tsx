import {
  ECDropdownMenuCascadingMenu,
  ECDropdownMenu,
  ECDropdownMenuContent,
  ECDropdownMenuItem,
  ECDropdownMenuLabel,
  ECDropdownMenuSeparator,
  ECDropdownMenuShortcut,
  ECDropdownMenuTrigger,
} from "@/components/molecules/dropdown-menu";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/organisms/sidebar";
import { useAppLayoutContext } from "../context/app-layout-context";
import {
  DropdownItemType,
  DropdownLabelItem,
  DropdownLink,
  DropdownMenuListProps,
  DropdownSubmenu,
  SidebarDropdownProps,
} from "../types/sidebar-menu.types";
import CollapsedSidebarItemTrigger from "./collapsed-sidebar-item-trigger";

/**
 * Renders a single item within the dropdown menu based on its type.
 */
function DropdownItem({ item }: { item: DropdownItemType }) {
  switch (item.type) {
    case "link": {
      const { icon, text, link, shortcut } = item as DropdownLink;
      return (
        <ECDropdownMenuItem className="rounded-12 gap-4 p-8">
          <SidebarMenuButton icon={icon} text={text} link={link} />
          {shortcut && (
            <ECDropdownMenuShortcut>{shortcut}</ECDropdownMenuShortcut>
          )}
        </ECDropdownMenuItem>
      );
    }
    case "submenu": {
      const { text, submenuItems } = item as DropdownSubmenu;
      return (
        <ECDropdownMenuCascadingMenu trigger={text} key={text}>
          {/* Using text as a simple key */}
          {/* RECURSION HERE: Calling DropdownMenuList to render child items */}
          <DropdownMenuList items={submenuItems} />
        </ECDropdownMenuCascadingMenu>
      );
    }
    case "separator": {
      return <ECDropdownMenuSeparator />;
    }
    case "label": {
      const { text } = item as DropdownLabelItem;
      return <ECDropdownMenuLabel>{text}</ECDropdownMenuLabel>;
    }
    default:
      return null;
  }
}

/**
 * Renders the list of items within a dropdown menu.
 */
function DropdownMenuList({ items }: DropdownMenuListProps) {
  return (
    <>
      {items.map((item, index) => (
        <DropdownItem key={index} item={item} />
      ))}
    </>
  );
}

/**
 * A component that renders a dropdown menu item within the sidebar.
 */
function SidebarDropdownItem({
  iconName,
  tooltip,
  dropdownItems,
}: SidebarDropdownProps) {
  const {
    state: { collapsedWidth },
  } = useAppLayoutContext();

  return (
    <>
      <ECDropdownMenu>
        <SidebarMenuItem>
          {/* <TriggerWithTooltip /> */}
          <CollapsedSidebarItemTrigger tooltip={tooltip}>
            <ECDropdownMenuTrigger
              asChild
              className="rounded-12 flex w-full justify-center"
            >
              <SidebarMenuButton
                icon={iconName}
                className="hover:bg-black-4 aspect-square w-full"
                style={{ maxWidth: `calc(${collapsedWidth} - 24px)` }}
              />
            </ECDropdownMenuTrigger>
          </CollapsedSidebarItemTrigger>

          <ECDropdownMenuContent className="min-w-[8rem] max-w-[11rem] text-black-100" side="right" align="start">
            {/* USING THE RECURSIVE RENDER COMPONENT HERE */}
            <DropdownMenuList items={dropdownItems} />
          </ECDropdownMenuContent>
        </SidebarMenuItem>
      </ECDropdownMenu>
    </>
  );
}

export default SidebarDropdownItem;
