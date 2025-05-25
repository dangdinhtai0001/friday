import React from "react";
import { IconLoader } from "@/components/atoms/icon-loader";
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
  MCTooltip,
  MCTooltipContent,
  MCTooltipProvider,
  MCTooltipTrigger,
} from "@/components/molecules/tooltip";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/organisms/sidebar2";
import { useAppLayoutContext } from "../context/app-layout-context";
import { Link } from "react-router";

// Interface for a simple dropdown link item
export interface DropdownLink {
  type: "link";
  text: string;
  icon?: string | React.ReactNode;
  link?: string;
  shortcut?: string;
}

// Interface for a dropdown submenu trigger item
export interface DropdownSubmenu {
  type: "submenu";
  text: string;
  icon?: string | React.ReactNode;
  submenuItems: DropdownItemType[]; // Array of child items, can be links or other submenus
}

// Interface for a dropdown separator
export interface DropdownSeparatorItem {
  type: "separator";
}

// Interface for a dropdown label
export interface DropdownLabelItem {
  type: "label";
  text: string;
}

// Unified type for any item in the dropdown menu
export type DropdownItemType =
  | DropdownLink
  | DropdownSubmenu
  | DropdownSeparatorItem
  | DropdownLabelItem;

/**
 * @interface SidebarDropdownProps
 * @description Defines the props for the SidebarDropdown component.
 * @property {string} iconName - The name of the icon to display on the main dropdown trigger button.
 * @property {string | React.ReactNode} [tooltip] - Optional tooltip text or element to display on hover.
 * @property {DropdownItemType[]} dropdownItems - An array of items to render within the dropdown menu.
 */
interface SidebarDropdownProps {
  iconName: string | React.ReactNode;
  tooltip?: string | React.ReactNode;
  dropdownItems: DropdownItemType[];
}

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

interface DropdownMenuListProps {
  items: DropdownItemType[];
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

  const MainDropdownTrigger = () => (
    <MCDropdownMenuTrigger
      asChild
      className="rounded-12 flex w-full justify-center"
    >
      <SidebarMenuButton
        icon={
          typeof iconName === "string" ? (
            <IconLoader name={iconName} className="size-24" />
          ) : (
            iconName
          )
        }
        className="hover:bg-black-100/4 aspect-square w-full"
        style={{ maxWidth: `calc(${collapsedWidth} - 24px)` }}
      />
    </MCDropdownMenuTrigger>
  );

  const TriggerWithTooltip = () => {
    if (tooltip) {
      return (
        <MCTooltipProvider>
          <MCTooltip>
            <MCTooltipTrigger asChild>
              <MainDropdownTrigger />
            </MCTooltipTrigger>
            <MCTooltipContent side="right">{tooltip}</MCTooltipContent>
          </MCTooltip>
        </MCTooltipProvider>
      );
    }
    return <MainDropdownTrigger />;
  };

  return (
    <>
      <MCDropdownMenu>
        <SidebarMenuItem>
          <TriggerWithTooltip />
          <MCDropdownMenuContent className="w-56" side="right">
            {/* USING THE RECURSIVE RENDER COMPONENT HERE */}
            <DropdownMenuList items={dropdownItems} />
          </MCDropdownMenuContent>
        </SidebarMenuItem>
      </MCDropdownMenu>
    </>
  );
}

export default SidebarDropdownItem;
