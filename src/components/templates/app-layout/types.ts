import { CollapsedSidebarItem } from "./collapse/collapsed-sidebar-content";
import { ExpandedSidebarItem } from "./expand/expanded-sidebar-content";

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
