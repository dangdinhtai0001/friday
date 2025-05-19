import React from "react";
import {
  SidebarState,
  SidebarActions,
  SidebarContextValue,
} from "../sidebar.type";
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_EXPANDED_WIDTH } from "../constants";

// Create a generic context
export const SidebarContext = React.createContext<
  SidebarContextValue | undefined
>(undefined);

// Define a generic initial state
function createInitialState(): SidebarState {
  return {
    open: false,
    openMobile: false,
    side: "left",
    variant: "sidebar",
    collapsible: "icon",
    expandedWidth: SIDEBAR_EXPANDED_WIDTH,
    collapsedWidth: SIDEBAR_COLLAPSED_WIDTH,
  };
}

// Helper function to create no-op implementations for actions
const createNoOpActions = (): SidebarActions => ({
  setOpen: () => {},
  setOpenMobile: () => {},
  toggleSidebar: () => {},
});

// Custom hook to use the context
export function useSidebarContext() {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarContext");
  }
  return context;
}

// Export a default context with no-op actions and initial state
export const defaultContextValue = {
  state: createInitialState(),
  actions: createNoOpActions(),
};
