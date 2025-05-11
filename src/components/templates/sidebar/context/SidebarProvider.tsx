import React, { PropsWithChildren } from "react";
import {
  SidebarActions,
  SidebarContextValue,
  SidebarProps,
  SidebarState,
} from "../sidebar.type";
import { SidebarContext, defaultContextValue } from "./SidebarContext";

function SidebarProvider({ children }: PropsWithChildren<SidebarProps>) {
  // Initialize state with default values
  const [state, setState] = React.useState<SidebarState>({
    ...(defaultContextValue.state as SidebarState),
  });

  // Define actions for the context
  // Memoize actions to stabilize their references
  const actions = React.useMemo<SidebarActions>(
    () => ({
      setOpen: (open: boolean) => {
        setState((prevState) => ({ ...prevState, open }));
      },
      setOpenMobile: (openMobile: boolean) => {
        setState((prevState) => ({ ...prevState, openMobile }));
      },
      toggleSidebar: () => {
        setState((prevState) => ({ ...prevState, open: !prevState.open }));
      },
    }),
    [],
  ); // Empty dependency array ensures actions are stable

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = React.useMemo<SidebarContextValue>(
    () => ({ state, actions }),
    [state, actions], // Only update when state or actions change
  );

  return (
    <SidebarContext.Provider value={contextValue as SidebarContextValue}>
      {children}
    </SidebarContext.Provider>
  );
}

export default SidebarProvider;
