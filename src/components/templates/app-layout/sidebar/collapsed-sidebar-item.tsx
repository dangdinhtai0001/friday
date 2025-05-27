import {
  ECCascadingMenu,
  MCDropdownMenu,
  MCDropdownMenuContent,
  MCDropdownMenuItem,
  MCDropdownMenuLabel,
  MCDropdownMenuSeparator,
  MCDropdownMenuShortcut,
  MCDropdownMenuTrigger,
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
        <MCDropdownMenuItem className="rounded-12 gap-4 p-8">
          <SidebarMenuButton icon={icon} text={text} link={link} />
          {shortcut && (
            <MCDropdownMenuShortcut>{shortcut}</MCDropdownMenuShortcut>
          )}
        </MCDropdownMenuItem>
      );
    }
    case "submenu": {
      const { text, submenuItems } = item as DropdownSubmenu;
      return (
        <ECCascadingMenu trigger={text} key={text}>
          {/* Using text as a simple key */}
          {/* RECURSION HERE: Calling DropdownMenuList to render child items */}
          <DropdownMenuList items={submenuItems} />
        </ECCascadingMenu>
      );
    }
    case "separator": {
      return <MCDropdownMenuSeparator />;
    }
    case "label": {
      const { text } = item as DropdownLabelItem;
      return <MCDropdownMenuLabel>{text}</MCDropdownMenuLabel>;
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
      <MCDropdownMenu>
        <SidebarMenuItem>
          {/* <TriggerWithTooltip /> */}
          <CollapsedSidebarItemTrigger tooltip={tooltip}>
            <MCDropdownMenuTrigger
              asChild
              className="rounded-12 flex w-full justify-center"
            >
              <SidebarMenuButton
                icon={iconName}
                className="hover:bg-black-4 aspect-square w-full"
                style={{ maxWidth: `calc(${collapsedWidth} - 24px)` }}
              />
            </MCDropdownMenuTrigger>
          </CollapsedSidebarItemTrigger>

          <MCDropdownMenuContent className="min-w-[8rem] max-w-[11rem] text-black-100" side="right">
            {/* USING THE RECURSIVE RENDER COMPONENT HERE */}
            <DropdownMenuList items={dropdownItems} />
          </MCDropdownMenuContent>
        </SidebarMenuItem>
      </MCDropdownMenu>
    </>
  );
}

export default SidebarDropdownItem;
