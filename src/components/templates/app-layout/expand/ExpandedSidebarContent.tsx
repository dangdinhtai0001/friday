import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
  } from "@/components/organisms/sidebar2"; // Kiểm tra đường dẫn chính xác
  import SidebarCollapsibleItem, {
    SidebarSubItem,
  } from "../collapse/SidebarCollapsibleItem"; // Điều chỉnh đường dẫn nếu cần
  
  // Dữ liệu mẫu cho Collapsible Menu - ĐƯA TỪ APPSIDEBAR CŨ SANG ĐÂY
  const platformCollapsibleItems: SidebarSubItem[] = [
    { type: "link", text: "Overview", link: "/overview" },
    { type: "link", text: "Projects", link: "#" },
    {
      type: "collapsible",
      text: "Settings",
      icon: "settings",
      nestedItems: [
        { type: "link", text: "Account", link: "#" },
        { type: "link", text: "Privacy", link: "#", icon: "lock-square" },
        {
          type: "collapsible",
          text: "Notifications", // Cấp độ 3
          icon: "bell",
          nestedItems: [
            { type: "link", text: "Email settings", link: "#" },
            { type: "link", text: "SMS settings", link: "#" },
            {
              type: "collapsible",
              text: "Advanced", // Cấp độ 4
              icon: "command",
              nestedItems: [
                { type: "link", text: "API Keys", link: "#" },
                { type: "link", text: "Webhooks", link: "#" },
              ],
            },
          ],
        },
      ],
    },
  ];
  
  function ExpandedSidebarContent() {
    return (
      <SidebarGroup className="h-full">
        <SidebarGroupLabel>Platform0</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarCollapsibleItem
            mainIcon={"id"}
            mainText={"User Profile"}
            subItems={platformCollapsibleItems}
          />
  
          <SidebarCollapsibleItem
            mainIcon={"id"}
            mainText={"User Profile2"}
            subItems={platformCollapsibleItems} // Bạn có thể dùng dữ liệu khác ở đây nếu muốn
          />
        </SidebarMenu>
      </SidebarGroup>
    );
  }
  
  export default ExpandedSidebarContent;