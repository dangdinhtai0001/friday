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
} from "@/components/organisms/sidebar";
import { cn } from "@/composables/utils/shadcn";
import logo from "@/assets/images/vite.svg";
import { MCSkeleton } from "@/components/atoms/skeleton";
import SidebarMainNavigation from "./SidebarMainNavigation";
import React from "react";
import SidebarItemContent from "./SidebarItemContent";
import { useAuthStore } from "@/store";
import {
  MCAvatar,
  MCAvatarFallback,
  MCAvatarImage,
} from "@/components/atoms/avatar";
import { IconLoader } from "@/components/atoms/icon-loader";

function AppLayout() {
  useRequireAuth();

  const { user } = useAuthStore();
  const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true);

  return (
    <>
      <MCSidebarRoot defaultOpen={true}>
        <MCSidebar>
          {/* ------------------------------------------------ sidebar:header section ------------------------------------------------ */}
          <MCSidebarHeader>
            <div className="typography-regular-24 flex h-[68px] w-full items-center justify-start gap-12">
              <SidebarItemContent
                icon={
                  <img src={logo} className="app-logo size-32" alt="logo" />
                }
                title="Friday"
                isExpanded={isSidebarExpanded}
              />
            </div>
          </MCSidebarHeader>
          {/* ------------------------------------------------ sidebar:header section ------------------------------------------------ */}
          <MCSidebarContent>
            {/* ------------------------ sidebar:content::main section ------------------------ */}
            <MCSidebarGroup>
              <SidebarMainNavigation isSidebarExpanded={isSidebarExpanded} />
            </MCSidebarGroup>
            {/* ------------------------ sidebar:content::main section ------------------------ */}
          </MCSidebarContent>
          {/* ------------------------------------------------ sidebar:footer section ------------------------------------------------ */}
          <MCSidebarFooter>
            <div className="typography-regular-14 flex h-[68px] w-full items-center justify-start gap-12">
              <SidebarItemContent
                icon={
                  <MCAvatar className="size-24">
                    <MCAvatarImage src={user?.profile?.avatarUrl} />
                    <MCAvatarFallback>
                      <MCSkeleton className="size-24 rounded-full" />
                    </MCAvatarFallback>
                  </MCAvatar>
                }
                title={user?.profile.name}
                isExpanded={isSidebarExpanded}
              />
            </div>
          </MCSidebarFooter>
          {/* ------------------------------------------------ sidebar:footer section ------------------------------------------------ */}
        </MCSidebar>
        <MCSidebarInset>
          <div
            className={cn(
              "bg-background-2 flex h-[68px] items-center gap-4 px-28 py-20",
            )}
          >
            <MCSidebarTrigger
              onToggleSidebar={() => {
                setIsSidebarExpanded(!isSidebarExpanded);
              }}
            >
              <IconLoader
                name="layout-sidebar-right-collapse"
                className="size-24"
              />
            </MCSidebarTrigger>
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
