import { SidebarInset, SidebarProvider } from "@/components/organisms/sidebar";
import { Outlet } from "react-router";
import AppHeader from "./app-header";
import AppLayoutProvider from "./context/app-layout-provider";
import { CollapsedSidebarItem, ExpandedSidebarItem } from ".";
import AppSidebar from "./sidebar/app-sidebar";

export type AppLayoutProps = {
  defaultSidebarExpanded?: boolean;
  defaultSidebarExpanedWidth?: string;
  defaultHeaderHeight?: string;
  defaultSidebarCollapsedWidth?: string;
  collapsedSidebarItemsData?: CollapsedSidebarItem[];
  expandedSidebarItemsData?: ExpandedSidebarItem[];
};

function AppLayout({
  defaultSidebarExpanded,
  defaultSidebarExpanedWidth: defaultSidebarWidth,
  defaultHeaderHeight,
  defaultSidebarCollapsedWidth: defaultCollapsedWidth,
  collapsedSidebarItemsData,
  expandedSidebarItemsData,
}: AppLayoutProps) {
  
  return (
    <>
      <AppLayoutProvider
        defaultSidebarExpanded={defaultSidebarExpanded}
        defaultSidebarWidth={defaultSidebarWidth}
        defaultHeaderHeight={defaultHeaderHeight}
        defaultCollapsedWidth={defaultCollapsedWidth}
        collapsedSidebarItemsData={collapsedSidebarItemsData}
        expandedSidebarItemsData={expandedSidebarItemsData}
      >
        <SidebarProvider
          defaultOpen
          variant="sidebar"
          collapsedWidth={defaultCollapsedWidth}
          expandedWidth={defaultSidebarWidth}
        >
          <div className="flex h-screen w-screen flex-row">
            <AppSidebar />
            <SidebarInset className="" style={{ width: `calc(100% - ${defaultSidebarWidth})` }}>
              <AppHeader />
              <div className="overflow-auto px-28 py-20 bg-background-1">
                <Outlet />
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </AppLayoutProvider>
    </>
  );
}

export default AppLayout;
