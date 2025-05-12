import React, { PropsWithChildren } from "react";
import {
  SidebarActions,
  SidebarContextValue,
  SidebarRootProps,
  SidebarState,
} from "../sidebar.type";
import { SidebarContext, defaultContextValue } from "./SidebarContext";

function SidebarProvider({
  defaultOpen,
  children,
  expandedWidth: expandedWidthProp,
  collapsedWidth: collapsedWidthProp,
  side: sideProp,
  variant: variantProp,
  collapsible: collapsibleProp,
}: PropsWithChildren<SidebarRootProps>) {
  // Initialize state with default values, overridden by props if provided
  const [state, setState] = React.useState<Omit<SidebarState, "state">>(
    () =>
      ({
        ...defaultContextValue.state,
        open:
          defaultOpen !== undefined
            ? defaultOpen
            : defaultContextValue.state.open,
        side:
          sideProp !== undefined ? sideProp : defaultContextValue.state.side,
        variant:
          variantProp !== undefined
            ? variantProp
            : defaultContextValue.state.variant,
        collapsible:
          collapsibleProp !== undefined
            ? collapsibleProp
            : defaultContextValue.state.collapsible,
        expandedWidth:
          expandedWidthProp !== undefined
            ? expandedWidthProp
            : defaultContextValue.state.expandedWidth,
        collapsedWidth:
          collapsedWidthProp !== undefined
            ? collapsedWidthProp
            : defaultContextValue.state.collapsedWidth,
      }) as Omit<SidebarState, "state">,
  );

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
