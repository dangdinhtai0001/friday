import React, { PropsWithChildren } from "react";
import {
  DataGridActions,
  DataGridContextValue,
  DataGridProps,
  DataGridState,
} from "../types";
import { DataGridContext, defaultContextValue } from "./DataGridContext";
import { Table } from "@tanstack/react-table";

function DataGridProvider<TData>({
  children,
}: PropsWithChildren<DataGridProps<TData>>) {
  // Initialize state with default values
  const [state, setState] = React.useState<DataGridState<TData>>({
    ...(defaultContextValue.state as DataGridState<TData>),
  });

  // Define actions for the context
  // Memoize actions to stabilize their references
  const actions = React.useMemo<DataGridActions<TData>>(
    () => ({
      initialTableInstance: (table: Table<TData>) => {
        setState((prevState) => ({ ...prevState, tableInstance: table })); // Use functional update
      },
      patchColumnHeaders: (columnHeaders: Record<string, string>) => {
        setState((prevState) => ({ ...prevState, columnHeaders }));
      },
    }),
    [],
  ); // Empty dependency array ensures actions are stable

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = React.useMemo<DataGridContextValue<TData>>(
    () => ({ state, actions }),
    [state, actions], // Only update when state or actions change
  );

  return (
    <DataGridContext.Provider
      value={contextValue as DataGridContextValue<unknown>}
    >
      {children}
    </DataGridContext.Provider>
  );
}

export default DataGridProvider;
