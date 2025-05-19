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
} from "@/components/templates/sidebar";
import { cn } from "@/composables/utils/shadcn";
import logo from "@/assets/images/vite.svg";
import { MCSkeleton } from "@/components/atoms/skeleton";

function AppLayout() {
  useRequireAuth();

  return (
    <>
      <MCSidebarRoot defaultOpen={false}>
        <MCSidebar>
          <MCSidebarHeader>
            <div className="flex h-[68px] items-center gap-4">
              <img src={logo} className="App-logo size-32" alt="logo" />
            </div>
          </MCSidebarHeader>
          <MCSidebarContent>
            <MCSkeleton className="h-full w-full bg-red-300" />
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
            <MCSidebarTrigger className="" />
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
