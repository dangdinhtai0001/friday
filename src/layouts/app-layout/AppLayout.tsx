import { Outlet } from "react-router";
import useRequireAuth from "@/composables/hooks/useRequireAuth";
import {
  MCSidebar,
  MCSidebarContent,
  MCSidebarInset,
  MCSidebarRoot,
  MCSidebarTrigger,
  MCSidebarHeader,
  MCSidebarFooter,
  MCSidebarGroup,
  MCSidebarGroupLabel,
  MCSidebarGroupContent,
  MCSidebarMenu,
  MCSidebarMenuItem,
  MCSidebarMenuButton,
} from "@/components/organisms/sidebar";
import { cn } from "@/composables/utils/shadcn";
import logo from "@/assets/images/vite.svg";
import { MCSkeleton } from "@/components/atoms/skeleton";
import SidebarMainNavigation from "./SidebarMainNavigation";
import React from "react";
import SidebarItemContent from "./SidebarItemContent";

function AppLayout() {
  useRequireAuth();

  const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true);

  return (
    <>
      <MCSidebarRoot defaultOpen={true}>
        <MCSidebar>
          <MCSidebarHeader>
            <div className="flex w-full items-center justify-start gap-8 h-[68px] typography-regular-24">
              <SidebarItemContent
                icon={
                  <img src={logo} className="app-logo size-32" alt="logo" />
                }
                title="Friday"
                isExpanded={isSidebarExpanded}
              />
            </div>
          </MCSidebarHeader>
          <MCSidebarContent>
            <MCSidebarGroup>
              <MCSidebarGroupLabel>group 1</MCSidebarGroupLabel>
              <MCSidebarGroupContent>
                <MCSidebarMenu>
                  <MCSidebarMenuItem>
                    <MCSidebarMenuButton asChild isActive tooltip="hehehe">
                      <a>hello</a>
                    </MCSidebarMenuButton>
                  </MCSidebarMenuItem>
                </MCSidebarMenu>
              </MCSidebarGroupContent>
            </MCSidebarGroup>
            <SidebarMainNavigation isSidebarExpanded={isSidebarExpanded} />
          </MCSidebarContent>
          <MCSidebarFooter>
            <MCSkeleton className="h-10 w-full" />
          </MCSidebarFooter>
        </MCSidebar>
        <MCSidebarInset>
          <div
            className={cn(
              "border-black-5 flex h-[68px] items-center gap-4 border-b-[0.5px] px-28 py-20",
            )}
          >
            <MCSidebarTrigger
              className=""
              onToggleSidebar={() => {
                setIsSidebarExpanded(!isSidebarExpanded);
              }}
            />
          </div>
          <div className="px-28 py-20">
            <Outlet />
          </div>
        </MCSidebarInset>
      </MCSidebarRoot>
    </>
  );
}

export default AppLayout;
