// AppLayoutProvider.tsx
import React, { PropsWithChildren } from "react";
import {
  AppLayoutActions,
  AppLayoutContextValue,
  AppLayoutState,
} from "../types";
import { AppLayoutContext, defaultContextValue } from "./app-layout-context";
import { ExpandedSidebarItem, CollapsedSidebarItem } from "..";

// Define a minimal AppLayoutRootProps type
export interface AppLayoutRootProps {
  defaultSidebarExpanded?: boolean;
  defaultSidebarWidth?: string;
  defaultHeaderHeight?: string;
  defaultCollapsedWidth?: string;
  collapsedSidebarItemsData?: CollapsedSidebarItem[];
  expandedSidebarItemsData?: ExpandedSidebarItem[];
}

function AppLayoutProvider({
  children,
  defaultSidebarExpanded = false,
  defaultSidebarWidth = "280px",
  defaultHeaderHeight = "68px",
  defaultCollapsedWidth = "64px",
  collapsedSidebarItemsData = [],
  expandedSidebarItemsData = [],
}: PropsWithChildren<AppLayoutRootProps>) {
  // Initialize state with default values
  const [state, setState] = React.useState<AppLayoutState>(() => ({
    ...defaultContextValue.state,
    isSidebarExpanded: defaultSidebarExpanded,
    expandedWidth: defaultSidebarWidth,
    headerHeight: defaultHeaderHeight,
    collapsedWidth: defaultCollapsedWidth,
    collapsedSidebarItemsData,
    expandedSidebarItemsData,
  }));

  // Define empty actions for the context
  const actions = React.useMemo<AppLayoutActions>(
    () => ({
      setIsSidebarExpanded: (expanded: boolean) => {
        setState((prev) => ({
          ...prev,
          isSidebarExpanded: expanded,
        }));
      },
    }),
    [setState],
  );

  // Memoize the context value
  const contextValue = React.useMemo<AppLayoutContextValue>(
    () => ({ state, actions }),
    [state, actions],
  );

  return (
    <AppLayoutContext.Provider value={contextValue}>
      {children}
    </AppLayoutContext.Provider>
  );
}

export default AppLayoutProvider;
