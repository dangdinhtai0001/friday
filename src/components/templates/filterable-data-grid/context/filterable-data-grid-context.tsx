import React from 'react';
import {
  FilterableDataGridActions,
  FilterableDataGridContextValue,
  FilterableDataGridState,
} from '../types';

// Create a generic context
export const FilterableDataGridContext = React.createContext<
  FilterableDataGridContextValue | undefined
>(undefined);

// Define a generic initial state (empty)
function createInitialState(): FilterableDataGridState {
  return {
    filters: [],
  };
}

// Helper function to create no-op implementations for actions (empty)
const createNoOpActions = (): FilterableDataGridActions => ({});

// Custom hook to use the context
export function useFilterableDataGridContext() {
  const context = React.useContext(FilterableDataGridContext);

  if (!context) {
    throw new Error(
      'useFilterableDataGridContext must be used within a FilterableDataGridContext',
    );
  }
  return context;
}

// Export a default context with no-op actions and initial state
export const defaultContextValue = {
  state: createInitialState(),
  actions: createNoOpActions(),
};
