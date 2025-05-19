/* eslint-disable @typescript-eslint/no-empty-object-type */
export type Side = "left" | "right";
export type Variant = "sidebar" | "floating" | "inset";
export type Collapsible = "offcanvas" | "icon" | "none";
export type SidebarStateType = "expanded" | "collapsed";

export type SidebarState = {
  open: boolean;
  openMobile: boolean;
  side: Side;
  variant: Variant;
  collapsible: Collapsible;
  expandedWidth: string;
  collapsedWidth: string;
  headerHeight: string;
};

export type SidebarActions = {
  setOpen: (open: boolean) => void;
  setOpenMobile: (open: boolean) => void;
  toggleSidebar: () => void;
};

export type SidebarContextValue = {
  state: SidebarState;
  actions: SidebarActions;
};

export interface SidebarRootProps {
  defaultOpen?: boolean;
  expandedWidth?: string;
  collapsedWidth?: string;
  headerHeight?: string;
  side?: Side;
  variant?: Variant;
  collapsible?: Collapsible;
}

export interface SidebarProps extends React.ComponentProps<"aside"> {
  className?: string;
  side?: Side;
  variant?: Variant;
  collapsible?: Collapsible;
}

export interface SidebarContentProps extends React.ComponentProps<"div"> {}
