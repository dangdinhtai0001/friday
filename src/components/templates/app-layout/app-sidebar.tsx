import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/organisms/sidebar2";
import { getNavMain } from "./helpers";
import {
  MCCollapsiable,
  MCCollapsibleContent,
  MCCollapsibleTrigger,
} from "@/components/atoms/collapsible";
import { IconLoader } from "@/components/atoms/icon-loader";

const navMainItems = getNavMain();

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader> header </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarMenu>
            <MCCollapsiable defaultOpen>
              <SidebarMenuItem>
                <MCCollapsibleTrigger
                  customIcon={
                    <IconLoader
                      name="chevron-right"
                      className="text-black-20"
                    />
                  }
                  iconPosition="start"
                >
                  <SidebarMenuButton tooltip={"tooltip"}>
                    <IconLoader name="chart-pie-2" />
                    <span> Getting Started </span>
                  </SidebarMenuButton>
                </MCCollapsibleTrigger>
              </SidebarMenuItem>
            </MCCollapsiable>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>footer</SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
