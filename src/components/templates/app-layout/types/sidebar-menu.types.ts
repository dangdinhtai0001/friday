// #region --- Collapsed

export interface DropdownMenuListProps {
  items: DropdownItemType[];
}

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
 * @interface SidebarDropdownProps
 * @description Defines the props for the SidebarDropdown component.
 * @property {string} iconName - The name of the icon to display on the main dropdown trigger button.
 * @property {string | React.ReactNode} [tooltip] - Optional tooltip text or element to display on hover.
 * @property {DropdownItemType[]} dropdownItems - An array of items to render within the dropdown menu.
 */
export interface SidebarDropdownProps {
  iconName: string | React.ReactNode;
  tooltip?: string | React.ReactNode;
  dropdownItems: DropdownItemType[];
}

// #endregion

// #region --- Expanded

// Interface for a nested collapsible menu item
export interface NestedCollapsibleMenuItem {
  type: "collapsible";
  text: string;
  icon?: string | React.ReactNode;
  nestedItems: SidebarSubMenuItem[]; // An array of SidebarSubMenuItem, allowing for unlimited nesting
}

// Interface for a simple link menu item
export interface LinkMenuItem {
  type: "link";
  text: string;
  link: string;
  icon?: string | React.ReactNode;
}

// Type for all possible sidebar submenu items: either a link or a nested collapsible item
export type SidebarSubMenuItem = LinkMenuItem | NestedCollapsibleMenuItem;

/**
 * @interface SidebarCollapsibleProps
 * @description Defines the props for the SidebarCollapsible component.
 * @property {string} mainIcon - The name or element for the icon of the main trigger button.
 * @property {string} mainText - The text label for the main trigger button.
 * @property {SidebarSubMenuItem[]} subItems - An array of submenu items (links or nested collapsibles).
 */
export interface SidebarCollapsibleProps {
  mainIcon: string | React.ReactNode;
  mainText: string;
  subItems: SidebarSubMenuItem[];
}

export interface SidebarSubMenuItemProps {
  item: SidebarSubMenuItem;
}

/**
 * @interface ExpandedSidebarItem
 * @description Defines the data structure for a single item in the expanded sidebar.
 * It can be either a direct link or a collapsible group.
 */
export interface ExpandedSidebarItem {
  mainIcon: string | React.ReactNode;
  mainText: string;
  type: "link" | "collapsible" | "label"; // Thêm thuộc tính type
  link?: string; // Thêm thuộc tính link, chỉ dùng khi type là "link"
  subItems?: SidebarSubMenuItem[]; // subItems là tùy chọn, chỉ dùng khi type là "collapsible"
  id: string; // Thêm ID để làm key, quan trọng cho React
}
// #endregion