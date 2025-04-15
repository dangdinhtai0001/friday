import React from "react";
import type {
  DataViewState,
  DataViewActions,
  DataViewContextValue,
} from "../types.d";

// Create a generic context
export const DataViewContext = React.createContext<
  { state: DataViewState; actions: DataViewActions } | undefined
>(undefined);

// Custom hook to use the context
export const useDataViewContext = () => {
  const context = React.useContext(DataViewContext);

  if (!context) {
    throw new Error("useDataViewContext must be used within a DataViewContext");
  }
  return context;
};

// Helper function to create no-op implementations for actions
const createNoOpActions = (): DataViewActions => ({});

// Define a generic initial state
const createInitialState = (): DataViewState => {
  return {};
};

// Export a default context with no-op actions and initial state
export const defaultContextValue: DataViewContextValue = {
  state: createInitialState(),
  actions: createNoOpActions(),
};
