import { Collapsible, SidebarStateType } from "./sidebar.type";

export const computeSidebarState = (params: {
  open: boolean;
  collapsible: Collapsible;
}): SidebarStateType => {
  if (params.collapsible === "none") {
    return "collapsed";
  }
  return params.open ? "expanded" : "collapsed";
};

export const computeSidebarWidth = (params: {
  open: boolean;
  collapsible: Collapsible;
  collapsedWidth: string;
  expandedWidth: string;
}): string => {
  const state = computeSidebarState({
    open: params.open,
    collapsible: params.collapsible,
  });

  if (state === "collapsed") {
    return params.collapsedWidth;
  }

  if (state === "expanded") {
    return params.expandedWidth;
  }

  return "";
};
