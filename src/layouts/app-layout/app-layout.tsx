import { AppLayout as AppLayoutTemplate } from "@/components/templates/app-layout";
import {
  AppLayoutMenuItem,
  convertAppLayoutItemToCollapsedItem,
  convertAppLayoutItemToExpandedItem,
  createUrlToDisplayNameMap,
} from "./helpers";
import {
  CollapsedSidebarItem as CollapsedSidebarItemType,
  ExpandedSidebarItem as ExpandedSidebarItemType,
} from "@/components/templates/app-layout";
import { convertUnifiedToCollapsedSidebarItems, convertUnifiedToExpandedSidebarItems, initialUnifiedRoutes } from "@/config";

const platform1DropdownItemsUnified: AppLayoutMenuItem[] = [
  // Cập nhật tên interface
  {
    id: "overview-platform1",
    type: "link",
    text: "Overview",
    link: "/overview",
    icon: "dashboard",
  },
  {
    id: "projects-platform1",
    type: "link",
    text: "Projects",
    link: "#",
    icon: "folder",
  },
  {
    id: "settings-platform1",
    type: "submenu",
    text: "Settings",
    icon: "settings",
    submenuItems: [
      {
        id: "account-settings",
        type: "link",
        text: "Account",
        link: "#",
        icon: "user",
      },
      {
        id: "privacy-settings",
        type: "link",
        text: "Privacy",
        link: "#",
        icon: "lock-square",
      },
      {
        id: "notifications-settings",
        type: "submenu",
        text: "Notifications",
        icon: "bell",
        submenuItems: [
          {
            id: "email-notifications",
            type: "link",
            text: "Email settings",
            link: "#",
            icon: "mail",
          },
          {
            id: "sms-notifications",
            type: "link",
            text: "SMS settings",
            link: "#",
            icon: "message-circle",
          },
          {
            id: "advanced-notifications",
            type: "submenu",
            text: "Advanced",
            icon: "command",
            submenuItems: [
              {
                id: "api-keys-advanced",
                type: "link",
                text: "API Keys",
                link: "#",
                icon: "key",
              },
              {
                id: "webhooks-advanced",
                type: "link",
                text: "Webhooks",
                link: "#",
                icon: "webhook",
              },
            ],
          },
        ],
      },
    ],
  },
];

const menuItemsUnified: AppLayoutMenuItem[] = [
  // Cập nhật tên interface
  {
    id: "tooltip-id",
    type: "submenu",
    icon: "id",
    text: "Tooltip for ID",
    submenuItems: platform1DropdownItemsUnified,
  },
  {
    id: "tooltip-rocket",
    type: "submenu",
    icon: "rocket",
    text: "Tooltip for Rocket",
    submenuItems: platform1DropdownItemsUnified,
  },
];

// Create the URL to display name map
const urlToDisplayNameMap = createUrlToDisplayNameMap(menuItemsUnified);

// Gọi hàm convert để tạo ra collapsedSidebarItemsData
const generatedCollapsedSidebarItemsData: CollapsedSidebarItemType[] =
  menuItemsUnified
    .map(convertAppLayoutItemToCollapsedItem)
    .filter((item) => item !== null) as CollapsedSidebarItemType[];

const generatedExpandedSidebarItemsData: ExpandedSidebarItemType[] =
  menuItemsUnified
    .map(convertAppLayoutItemToExpandedItem)
    .filter((item) => item !== null) as ExpandedSidebarItemType[];

function AppLayout() {

  const expandedSidebarItems = convertUnifiedToExpandedSidebarItems(initialUnifiedRoutes);
  const collapsedSidebarItems = convertUnifiedToCollapsedSidebarItems(initialUnifiedRoutes);

  console.log(collapsedSidebarItems);

  return (
    <>
      <AppLayoutTemplate
        defaultSidebarExpanded={true}
        defaultSidebarExpanedWidth={"212px"}
        defaultHeaderHeight={"68px"}
        defaultSidebarCollapsedWidth={"64px"}
        // collapsedSidebarItemsData={generatedCollapsedSidebarItemsData}
        // expandedSidebarItemsData={generatedExpandedSidebarItemsData}
        expandedSidebarItemsData={expandedSidebarItems}
        collapsedSidebarItemsData={collapsedSidebarItems}
      ></AppLayoutTemplate>
    </>
  );
}

export default AppLayout;
