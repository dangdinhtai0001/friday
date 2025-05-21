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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/organisms/sidebar2";
import { getNavMain } from "./helpers";
import {
  MCCollapsiable,
  MCCollapsibleContent,
  MCCollapsibleTrigger,
} from "@/components/atoms/collapsible";
import {
  MCDropdownMenu,
  MCDropdownMenuContent,
  MCDropdownMenuItem,
  MCDropdownMenuTrigger,
} from "@/components/molecules/dropdown-menu";

const navMainItems = getNavMain();

function AppSidebar({
  isSidebarExpanded,
  ...props
}: React.ComponentProps<typeof Sidebar> & { isSidebarExpanded: boolean }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader> header </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            <MCCollapsiable defaultOpen>
              <SidebarMenuItem className="flex flex-col items-start">
                <MCCollapsibleTrigger
                  asChild
                  className="hover:bg-black-100/4 rounded-12 w-full gap-4 p-8"
                  iconPosition="start"
                  showIcon={!isSidebarExpanded}
                >
                  <SidebarMenuButton icon="id" text="User Profile" />
                </MCCollapsibleTrigger>

                <MCCollapsibleContent className="px-1">
                  <SidebarMenuSub className="gap-4">
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        className="hover:bg-black-100/4 rounded-12 w-full gap-4 p-8"
                      >
                        <a href="#">Overview</a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>

                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        className="hover:bg-black-100/4 rounded-12 w-full gap-4 p-8"
                      >
                        <a href="#">Projects</a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>

                    <MCCollapsiable>
                      <MCCollapsibleTrigger
                        asChild
                        className="hover:bg-black-100/4 rounded-12 w-full gap-4 p-8"
                        iconPosition="start"
                      >
                        <SidebarMenuSubButton asChild>
                          <a href="#">Settings</a>
                        </SidebarMenuSubButton>
                      </MCCollapsibleTrigger>

                      <MCCollapsibleContent className="px-1">
                        <SidebarMenuSub className="gap-4">
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              asChild
                              className="hover:bg-black-100/4 rounded-12 w-full gap-4 p-8"
                            >
                              <a href="#">Account</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              asChild
                              className="hover:bg-black-100/4 rounded-12 w-full gap-4 p-8"
                            >
                              <a href="#">Privacy</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </MCCollapsibleContent>
                    </MCCollapsiable>
                  </SidebarMenuSub>
                </MCCollapsibleContent>
              </SidebarMenuItem>
            </MCCollapsiable>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Platform2</SidebarGroupLabel>
          <SidebarMenu>
            <MCDropdownMenu>
              <SidebarMenuItem>
                <MCDropdownMenuTrigger asChild className="w-full rounded-12">
                  <SidebarMenuButton icon="id" />
                </MCDropdownMenuTrigger>

                <MCDropdownMenuContent side="right">
                  <MCDropdownMenuItem>
                    <SidebarMenuButton icon="id" text="User Profile" />
                  </MCDropdownMenuItem>
                </MCDropdownMenuContent>
              </SidebarMenuItem>
            </MCDropdownMenu>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>footer</SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
