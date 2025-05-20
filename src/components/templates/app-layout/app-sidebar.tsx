import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/organisms/sidebar2";

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader> header </SidebarHeader>
      <SidebarContent>content</SidebarContent>
      <SidebarFooter>footer</SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
