import {
  CollapsedSidebarItem,
  ExpandedSidebarItem,
} from "./sidebar-menu.types";

export type AppLayoutState = {
  isSidebarExpanded: boolean;
  expandedWidth: string;
  collapsedWidth: string;
  headerHeight: string;
  collapsedSidebarItemsData: CollapsedSidebarItem[];
  expandedSidebarItemsData: ExpandedSidebarItem[];
};

export type AppLayoutActions = {
  setIsSidebarExpanded: (expanded: boolean) => void;
};

export type AppLayoutContextValue = {
  state: AppLayoutState;
  actions: AppLayoutActions;
};
