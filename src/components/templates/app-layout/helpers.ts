// src/utils/helpers.ts (hoặc một thư mục phù hợp với cấu trúc dự án của bạn)

import React from "react"; // Cần import React nếu icon là ReactNode

// Định nghĩa cấu trúc dữ liệu cho mỗi mục sidebar
export interface SidebarItem {
  label: string;
  icon?: string | React.ReactNode; // Thay đổi từ 'string' thành 'string | React.ReactNode'
  link?: string; // Đổi tên từ 'href' thành 'link'
  defaultOpen?: boolean; // Tùy chọn để mở mặc định Collapsible
  children?: SidebarItem[]; // Các mục con, tạo thành submenu
}

// Hàm trả về dữ liệu mẫu cho sidebar
export function getSidebarNavigation(): SidebarItem[] {
  // Trong tương lai, bạn có thể fetch dữ liệu từ API, xử lý logic, v.v.
  // Hiện tại, chúng ta sẽ trả về dữ liệu tĩnh
  return [
    {
      label: "Platform",
      children: [
        {
          label: "User Profile",
          icon: "id", // Bạn có thể dùng string cho icon
          defaultOpen: true,
          children: [
            { label: "Overview", link: "#" },
            { label: "Projects", link: "#" },
            {
              label: "Settings",
              children: [
                { label: "Account", link: "#" },
                { label: "Privacy", link: "#" },
              ],
            },
          ],
        },
        {
          label: "Analytics",
          icon: "chart", // Hoặc có thể là một ReactNode: <IconLoader icon="chart" />
          link: "/analytics",
        },
      ],
    },
    {
      label: "Resources",
      children: [
        {
          label: "Documentation",
          icon: "document",
          link: "/docs",
        },
        {
          label: "Support",
          icon: "support",
          link: "/support",
        },
      ],
    },
  ];
}