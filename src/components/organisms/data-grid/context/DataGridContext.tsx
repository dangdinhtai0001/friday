import React from "react";
import { v4 as uuidv4 } from "uuid";
import { DataGridState, DataGridActions, DataGridContextValue } from "../types";

// Create a generic context
export const DataGridContext = React.createContext<
  DataGridContextValue<unknown> | undefined
>(undefined);

// Define a generic initial state
function createInitialState<TData>(): DataGridState<TData> {
  return {
    id: uuidv4(),
  };
}

// Helper function to create no-op implementations for actions
const createNoOpActions = <TData,>(): DataGridActions<TData> => ({
  initialTableInstance: () => {},
});

// Custom hook to use the context
export function useDataGridContext() {
  const context = React.useContext(DataGridContext);

  if (!context) {
    throw new Error("useDataGridContext must be used within a DataGridContext");
  }
  return context;
}

// Export a default context with no-op actions and initial state
export const defaultContextValue = {
  state: createInitialState(),
  actions: createNoOpActions(),
};
