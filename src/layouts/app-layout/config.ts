// sidebarNavigationData.ts (Tên file mới để tránh nhầm lẫn)

// Định nghĩa các loại mục menu
type DropdownMenuItemType = {
  type: "item";
  label: string; // Nội dung hiển thị của item
  shortcut?: string; // Phím tắt (nếu có)
  onClick?: () => void; // Xử lý khi click
  url?: string;
  inset?: boolean; // Thuộc tính inset của DropdownMenuItem
  variant?: "default" | "destructive"; // Thuộc tính variant của DropdownMenuItem
};

type DropdownMenuLabelType = {
  type: "label";
  label: string;
  inset?: boolean;
};

type DropdownMenuSeparatorType = {
  type: "separator";
};

type DropdownMenuGroupType = {
  type: "group";
  items: DropdownMenuChild[]; // Các mục con trong group
};

type DropdownMenuSubmenuType = {
  type: "submenu";
  trigger: string; // Nội dung hiển thị trên trigger của submenu
  inset?: boolean; // Thuộc tính inset của CascadingMenu
  items: DropdownMenuChild[]; // Các mục con trong submenu
};

// Kiểu hợp nhất cho tất cả các mục menu con có thể có
export type DropdownMenuChild =
  | DropdownMenuItemType
  | DropdownMenuLabelType
  | DropdownMenuSeparatorType
  | DropdownMenuGroupType
  | DropdownMenuSubmenuType;

// Định nghĩa một kiểu dữ liệu mới cho các mục cấp cao nhất của Sidebar
interface SidebarRootItem {
  title: string;
  url?: string;
  icon?: string;
  tooltip?: string;
  // Nội dung sẽ được render bởi DynamicDropdownMenu khi mục này được kích hoạt
  content?: DropdownMenuChild[];
  isActive?: boolean; // Nếu bạn muốn mục chính có trạng thái active
}

const sidebarNavigationData: SidebarRootItem[] = [
  {
    title: "Getting Started",
    url: "/getting-started", // url cho mục chính
    icon: "rocket",
    tooltip: "Getting Started",
    content: [
      {
        type: "item",
        label: "Installation",
        url: "/getting-started/installation",
      },
      {
        type: "item",
        label: "Project Structure",
        url: "/getting-started/structure",
      },
    ],
  },
  {
    title: "Building Your Application",
    url: "/building-app",
    icon: "apps",
    tooltip: "Building Your Application",
    content: [
      { type: "item", label: "Routing", url: "/building-app/routing" },
      {
        type: "item",
        label: "Data Fetching",
        url: "/building-app/data-fetching",
      },
      { type: "item", label: "Rendering", url: "/building-app/rendering" },
      { type: "item", label: "Caching", url: "/building-app/caching" },
      { type: "item", label: "Styling", url: "/building-app/styling" },
      { type: "item", label: "Optimizing", url: "/building-app/optimizing" },
      { type: "item", label: "Configuring", url: "/building-app/configuring" },
      { type: "item", label: "Testing", url: "/building-app/testing" },
      {
        type: "item",
        label: "Authentication",
        url: "/building-app/authentication",
      },
      { type: "item", label: "Deploying", url: "/building-app/deploying" },
      { type: "item", label: "Upgrading", url: "/building-app/upgrading" },
      { type: "item", label: "Examples", url: "/building-app/examples" },
    ],
  },
  {
    title: "API Reference",
    url: "/api-reference",
    content: [
      { type: "item", label: "Components", url: "/api-reference/components" },
      {
        type: "item",
        label: "File Conventions",
        url: "/api-reference/file-conventions",
      },
      { type: "item", label: "Functions", url: "/api-reference/functions" },
      {
        type: "item",
        label: "next.config.js Options",
        url: "/api-reference/next-config-options",
      },
      { type: "item", label: "CLI", url: "/api-reference/cli" },
      {
        type: "item",
        label: "Edge Runtime",
        url: "/api-reference/edge-runtime",
      },
    ],
  },
  {
    title: "Architecture",
    url: "/architecture",
    content: [
      {
        type: "item",
        label: "Accessibility",
        url: "/architecture/accessibility",
      },
      {
        type: "item",
        label: "Fast Refresh",
        url: "/architecture/fast-refresh",
      },
      {
        type: "item",
        label: "Next.js Compiler",
        url: "/architecture/nextjs-compiler",
      },
      {
        type: "item",
        label: "Supported Browsers",
        url: "/architecture/supported-browsers",
      },
      { type: "item", label: "Turbopack", url: "/architecture/turbopack" },
    ],
  },
  {
    title: "Account & Settings",
    icon: "settings",
    content: [
      { type: "label", label: "User Management" },
      { type: "separator" },
      { type: "item", label: "My Profile", url: "/settings/profile" },
      { type: "item", label: "Security", url: "/settings/security" },
      {
        type: "submenu",
        trigger: "Advanced Options",
        items: [
          {
            type: "item",
            label: "API Keys",
            url: "/settings/advanced/api-keys",
          },
          {
            type: "item",
            label: "Webhooks",
            url: "/settings/advanced/webhooks",
          },
        ],
      },
      { type: "separator" },
      { type: "item", label: "Logout", variant: "destructive", url: "/logout" }, // Vẫn có thể dùng onClick cho logout nếu muốn xử lý đặc biệt
    ],
  },
  {
    title: "Simple Link",
    url: "/simple-page", // Một mục sidebar không có submenu
  },
];

export default sidebarNavigationData;
