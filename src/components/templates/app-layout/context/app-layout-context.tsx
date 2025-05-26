import React from "react";
import {
  AppLayoutState,
  AppLayoutActions,
  AppLayoutContextValue,
} from "..";

// Create a generic context
export const AppLayoutContext = React.createContext<
  AppLayoutContextValue | undefined
>(undefined);

// Define a generic initial state (empty)
function createInitialState(): AppLayoutState {
  return {
    isSidebarExpanded: false,
    expandedWidth: "280px",
    collapsedWidth: "64px",
    headerHeight: "68px",
    collapsedSidebarItemsData: [],
    expandedSidebarItemsData: [],
  };
}

// Helper function to create no-op implementations for actions (empty)
const createNoOpActions = (): AppLayoutActions => ({
  setIsSidebarExpanded: () => {},
});

// Custom hook to use the context
export function useAppLayoutContext() {
  const context = React.useContext(AppLayoutContext);

  if (!context) {
    throw new Error(
      "useAppLayoutContext must be used within a AppLayoutContext",
    );
  }
  return context;
}

// Export a default context with no-op actions and initial state
export const defaultContextValue = {
  state: createInitialState(),
  actions: createNoOpActions(),
};
