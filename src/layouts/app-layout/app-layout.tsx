import { AppLayout as AppLayoutTemplate } from "@/components/templates/app-layout";
import {
  convertUnifiedToCollapsedSidebarItems,
  convertUnifiedToExpandedSidebarItems,
  initialUnifiedRoutes,
} from "@/config";

const expandedSidebarItems =
  convertUnifiedToExpandedSidebarItems(initialUnifiedRoutes);
const collapsedSidebarItems =
  convertUnifiedToCollapsedSidebarItems(initialUnifiedRoutes);
function AppLayout() {
  return (
    <>
      <AppLayoutTemplate
        defaultSidebarExpanded={true}
        defaultSidebarExpanedWidth={"212px"}
        defaultHeaderHeight={"68px"}
        defaultSidebarCollapsedWidth={"64px"}
        expandedSidebarItemsData={expandedSidebarItems}
        collapsedSidebarItemsData={collapsedSidebarItems}
      ></AppLayoutTemplate>
    </>
  );
}

export default AppLayout;
