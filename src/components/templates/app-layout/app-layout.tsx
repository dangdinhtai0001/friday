import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/organisms/sidebar2";
import { Outlet } from "react-router";
import AppSidebar from "./app-sidebar";
import { cn } from "@/composables/utils/shadcn";
import { IconLoader } from "@/components/atoms/icon-loader";
import React from "react";

function AppLayout() {
  const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true);
  return (
    <>
      <SidebarProvider defaultOpen={true} variant="sidebar">
        <AppSidebar />
        <SidebarInset>
          <div
            className={cn(
              "bg-background-2 sticky top-0 flex h-[68px] items-center gap-4 px-28 py-20",
            )}
          >
            <SidebarTrigger
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            >
              <IconLoader
                name="layout-sidebar-right-collapse"
                className="size-24"
              />
            </SidebarTrigger>
          </div>
          <div className="px-28 py-20">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}

export default AppLayout;
