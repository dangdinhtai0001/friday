import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/organisms/sidebar2";
import { Outlet } from "react-router";
import AppSidebar from "./app-sidebar";
import { cn } from "@/composables/utils/shadcn";
import React from "react";

function AppLayout() {
  const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true);
  return (
    <>
      <SidebarProvider
        defaultOpen
        variant="sidebar"
        onOpenChange={(open) => {
          setIsSidebarExpanded(open);
        }}
      >
        <div className="flex h-screen w-screen flex-row">
          <AppSidebar isSidebarExpanded={isSidebarExpanded} />
          <SidebarInset>
            <div
              className={cn(
                "bg-background-2 sticky top-0 flex h-[68px] items-center gap-4 px-28 py-20",
              )}
            >
              <SidebarTrigger
                onToggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
              />
            </div>
            <div className="px-28 py-20 overflow-auto">
              <Outlet />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
}

export default AppLayout;
