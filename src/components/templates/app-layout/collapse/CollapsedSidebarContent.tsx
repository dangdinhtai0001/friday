// src/components/organisms/CollapsedSidebarContent.tsx

import { SidebarGroup, SidebarMenu } from "@/components/organisms/sidebar2"; // Kiểm tra đường dẫn chính xác
import SidebarDropdownItem, {
  DropdownMenuItemType,
} from "../expand/SidebarDropdownItem"; // Điều chỉnh đường dẫn nếu cần

// Dữ liệu mẫu cho Dropdown Menu - ĐƯA TỪ APPSIDEBAR CŨ SANG ĐÂY
const platform1DropdownItems: DropdownMenuItemType[] = [
  {
    type: "link",
    text: "Overview",
    link: "/overview",
    icon: "dashboard",
  },
  {
    type: "link",
    text: "Projects",
    link: "#",
    icon: "folder",
  },
  {
    type: "submenu",
    text: "Settings",
    icon: "settings",
    submenuItems: [
      { type: "link", text: "Account", link: "#", icon: "user" },
      { type: "link", text: "Privacy", link: "#", icon: "lock-square" },
      {
        type: "submenu",
        text: "Notifications",
        icon: "bell",
        submenuItems: [
          { type: "link", text: "Email settings", link: "#", icon: "mail" },
          {
            type: "link",
            text: "SMS settings",
            link: "#",
            icon: "message-circle",
          },
          {
            type: "submenu",
            text: "Advanced",
            icon: "command",
            submenuItems: [
              { type: "link", text: "API Keys", link: "#", icon: "key" },
              { type: "link", text: "Webhooks", link: "#", icon: "webhook" },
            ],
          },
        ],
      },
    ],
  },
];

function CollapsedSidebarContent() {
  return (
    <SidebarGroup className="h-full">
      {/* Không cần SidebarGroupLabel ở đây nếu bạn không muốn nó hiển thị khi thu gọn */}
      {/* Hoặc nếu bạn muốn, bạn có thể truyền nó từ AppSidebar hoặc hardcode ở đây */}
      <SidebarMenu >
        <SidebarDropdownItem
          iconName="id" // Icon cho trigger
          dropdownItems={platform1DropdownItems}
          tooltip="hehehehehe"
        />

        <SidebarDropdownItem
          iconName="rocket" // Icon cho trigger thứ hai
          dropdownItems={platform1DropdownItems} // Sử dụng lại dữ liệu hoặc dùng dữ liệu khác
          tooltip="hahahaha"
        />
      </SidebarMenu>
    </SidebarGroup>
  );
}

export default CollapsedSidebarContent;
