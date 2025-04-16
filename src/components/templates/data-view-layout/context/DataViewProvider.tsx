import { useState } from "react";
import {
  DataViewActions,
  DataViewProviderProps,
  DataViewState,
  Filter,
} from "../types";
import { DataViewContext, defaultContextValue } from "./DataViewContext";
import { isValidFilter } from "../Utils";

export const DataViewProvider = ({ children }: DataViewProviderProps) => {
  // Initialize state with default values
  const [state, setState] = useState<DataViewState>({ ...defaultContextValue.state });

  // Define actions for the context
  const actions: DataViewActions = {
    addFilter: (filter: Filter) => {
      if (!isValidFilter(filter)) {
        console.error("Invalid filter:", filter);
        return;
      }
      setState((prevState) => ({
        ...prevState,
        filters: [...(prevState.filters || []), filter],
      }));
    },

  };

  return (
    <DataViewContext.Provider value={{ state, actions }}>
      {children}
    </DataViewContext.Provider>
  );
};
