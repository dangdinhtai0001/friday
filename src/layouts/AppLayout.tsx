import { Outlet } from "react-router";
import useRequireAuth from "@/composables/hooks/useRequireAuth";
import {
  MCSidebar,
  MCSidebarContent,
  MCSidebarInset,
  MCSidebarRoot,
  MCSidebarTrigger,
} from "@/components/templates/sidebar";
import { cn } from "@/composables/utils/shadcn";

function AppLayout() {
  useRequireAuth();

  return (
    <>
      <MCSidebarRoot defaultOpen={false}>
        <MCSidebar>
          <MCSidebarContent>
            <div className="p-4">
              <h3>Admin Panel</h3>
            </div>
          </MCSidebarContent>
        </MCSidebar>
        <MCSidebarInset>
          <div
            className={cn(
              "border-black-5 flex h-[68px] items-center border-b-[0.5px]",
            )}
          >
            <MCSidebarTrigger className="w-fit" />
          </div>
          <Outlet />
        </MCSidebarInset>
      </MCSidebarRoot>
    </>
  );
}

export default AppLayout;
