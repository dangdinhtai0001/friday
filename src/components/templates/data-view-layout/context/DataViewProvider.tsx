import { useState } from "react";
import {
  DataViewActions,
  DataViewProviderProps,
  DataViewState,
} from "../types";
import { DataViewContext, defaultContextValue } from "./DataViewContext";

export const DataViewProvider = ({children}: DataViewProviderProps) => {
  // Initialize state with default values
  const [state, setState] = useState<DataViewState>({...defaultContextValue.state});

  // Define actions for the context
  const actions: DataViewActions = {};

  return (
      <DataViewContext.Provider value={{state, actions}}>
        {children}
      </DataViewContext.Provider>
};
