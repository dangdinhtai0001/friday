// src/components/organisms/sidebar2/context/SidebarProvider.tsx

import React, { PropsWithChildren } from "react";
import {
  SidebarActions,
  SidebarContextValue,
  SidebarRootProps,
  SidebarState,
} from "../types";
import { SidebarContext } from "./SidebarContext";
import { SIDEBAR_EXPANDED_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from "../constants";
import { useIsMobile } from "@/composables/hooks/use-mobile";
import { useSidebarState } from "../hooks/use-sidebar-state";
import { useSidebarKeyboardShortcut } from "../hooks/use-sidebar-keyboard-shortcut"; // Import hook đã sửa

function SidebarProvider({
  defaultOpen = true,
  children,
  expandedWidth: expandedWidthProp,
  collapsedWidth: collapsedWidthProp,
  side: sideProp,
  variant: variantProp,
  collapsible: collapsibleProp,
  onOpenChange,
}: PropsWithChildren<SidebarRootProps>) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  const [open, setOpen] = useSidebarState(defaultOpen, onOpenChange);

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((prev) => !prev);
    } else {
      setOpen((prev) => !prev);
    }
  }, [isMobile, setOpen, setOpenMobile]);

  const sidebarState: SidebarState = React.useMemo(
    () => ({
      open: open,
      openMobile: openMobile,
      side: sideProp || "left",
      variant: variantProp || "sidebar",
      collapsible: collapsibleProp || "icon",
      expandedWidth: expandedWidthProp || SIDEBAR_EXPANDED_WIDTH,
      collapsedWidth: collapsedWidthProp || SIDEBAR_COLLAPSED_WIDTH,
      state: open ? "expanded" : "collapsed",
    }),
    [
      open,
      openMobile,
      sideProp,
      variantProp,
      collapsibleProp,
      expandedWidthProp,
      collapsedWidthProp,
    ],
  );

  const actions: SidebarActions = React.useMemo(
    () => ({
      setOpen,
      setOpenMobile,
      toggleSidebar,
    }),
    [setOpen, setOpenMobile, toggleSidebar],
  );

  // GỌI HOOK PHÍM TẮT VÀ TRUYỀN HÀM toggleSidebar VÀO
  useSidebarKeyboardShortcut(actions.toggleSidebar); // hoặc đơn giản là useSidebarKeyboardShortcut(toggleSidebar);

  const contextValue: SidebarContextValue = React.useMemo(
    () => ({ state: sidebarState, actions }),
    [sidebarState, actions],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}

export default SidebarProvider;
