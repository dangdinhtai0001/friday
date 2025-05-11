/* eslint-disable @typescript-eslint/no-empty-object-type */
export type SidebarState = {
  open: boolean;
  openMobile: boolean;
  state: "expanded" | "collapsed";
};

export type SidebarActions = {
  setOpen: (open: boolean) => void;
  setOpenMobile: (open: boolean) => void;
  toggleSidebar: () => void;
};

export type SidebarContextValue = {
  state: SidebarState;
  actions: SidebarActions;
};

export type SidebarProps = {};
