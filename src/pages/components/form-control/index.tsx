import { ECIconLoader } from "@/components/atoms/icon-loader";
import { ECInput } from "@/components/atoms/input";
import { ECLabel } from "@/components/atoms/label";
import { MCTextFiled } from "@/components/atoms/text-field";
import { ECSeparator } from "@/components/atoms/separator";
import {
  ECTooltip,
  ECTooltipContent,
  ECTooltipProvider,
  ECTooltipTrigger,
} from "@/components/molecules/tooltip";
import { Button } from "@/components/atoms/button";
import { ECSkeleton } from "@/components/atoms/skeleton";
import {
  ECSheet,
  ECSheetClose,
  ECSheetContent,
  ECSheetDescription,
  ECSheetFooter,
  ECSheetHeader,
  ECSheetTitle,
  ECSheetTrigger,
} from "@/components/organisms/sheet";
import {
  ECDropdownMenuCascadingMenu,
  ECDropdownMenu,
  ECDropdownMenuContent,
  ECDropdownMenuGroup,
  ECDropdownMenuItem,
  ECDropdownMenuLabel,
  ECDropdownMenuSeparator,
  ECDropdownMenuShortcut,
  ECDropdownMenuTrigger,
} from "@/components/molecules/dropdown-menu";
import {
  ECCollapsibleContent,
  ECCollapsiable,
  ECCollapsibleTrigger,
} from "@/components/atoms/collapsible";
import { ChevronsUpDown } from "lucide-react";
import React from "react";

// Định nghĩa các loại mục menu
type DropdownMenuItemType = {
  type: "item";
  label: string; // Nội dung hiển thị của item
  shortcut?: string; // Phím tắt (nếu có)
  onClick?: () => void; // Xử lý khi click
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
type DropdownMenuChild =
  | DropdownMenuItemType
  | DropdownMenuLabelType
  | DropdownMenuSeparatorType
  | DropdownMenuGroupType
  | DropdownMenuSubmenuType;

// Kiểu dữ liệu cho toàn bộ cấu trúc dropdown menu
type DropdownMenuData = {
  triggerText: string; // Nội dung hiển thị trên trigger chính của dropdown
  content: DropdownMenuChild[]; // Các mục con trong content của dropdown
};

const myDropdownData: DropdownMenuData = {
  triggerText: "Menu", // Trong sidebar, đây có thể là nút "mở/đóng" sidebar hoặc chỉ là một tiêu đề
  content: [
    { type: "label", label: "Dashboard & Analytics" },
    { type: "separator" },
    {
      type: "group",
      items: [
        {
          type: "item",
          label: "Overview",
          shortcut: "⌘O",
          onClick: () => console.log("Go to Overview"),
        },
        {
          type: "item",
          label: "Reports",
          shortcut: "⌘R",
          onClick: () => console.log("View Reports"),
        },
        {
          type: "submenu",
          trigger: "Performance",
          items: [
            {
              type: "item",
              label: "Sales Data",
              onClick: () => console.log("Sales Data"),
            },
            {
              type: "item",
              label: "Marketing Metrics",
              onClick: () => console.log("Marketing Metrics"),
            },
            { type: "separator" },
            {
              type: "item",
              label: "Custom Analytics",
              onClick: () => console.log("Custom Analytics"),
            },
          ],
        },
      ],
    },
    { type: "separator" },
    { type: "label", label: "Project Management" },
    { type: "separator" },
    {
      type: "group",
      items: [
        {
          type: "item",
          label: "My Tasks",
          onClick: () => console.log("My Tasks"),
          inset: true,
        }, // Inset cho visual indentation
        {
          type: "item",
          label: "Projects List",
          onClick: () => console.log("Projects List"),
          inset: true,
        },
        {
          type: "submenu",
          trigger: "Teams",
          inset: true, // Inset cho trigger của submenu
          items: [
            {
              type: "item",
              label: "Development Team",
              onClick: () => console.log("Dev Team"),
            },
            {
              type: "item",
              label: "Design Team",
              onClick: () => console.log("Design Team"),
            },
            { type: "separator" },
            {
              type: "item",
              label: "Manage Teams",
              onClick: () => console.log("Manage Teams"),
            },
          ],
        },
        {
          type: "item",
          label: "Calendar",
          onClick: () => console.log("Calendar"),
        },
      ],
    },
    { type: "separator" },
    { type: "label", label: "Settings" },
    { type: "separator" },
    {
      type: "group",
      items: [
        {
          type: "item",
          label: "User Profile",
          onClick: () => console.log("Edit Profile"),
        },
        {
          type: "item",
          label: "Security & Privacy",
          onClick: () => console.log("Security Settings"),
        },
        {
          type: "submenu",
          trigger: "Integrations",
          items: [
            {
              type: "item",
              label: "Connect Slack",
              onClick: () => console.log("Connect Slack"),
            },
            {
              type: "item",
              label: "Connect GitHub",
              onClick: () => console.log("Connect GitHub"),
            },
            { type: "separator" },
            {
              type: "item",
              label: "API Keys",
              onClick: () => console.log("View API Keys"),
            },
          ],
        },
        {
          type: "item",
          label: "Logout",
          variant: "destructive",
          onClick: () => console.log("Logging out..."),
        },
      ],
    },
  ],
};

const renderDropdownChildren = (
  items: DropdownMenuChild[],
): React.ReactNode[] => {
  return items.map((item, index) => {
    switch (item.type) {
      case "item":
        return (
          <ECDropdownMenuItem
            key={index}
            onClick={item.onClick}
            inset={item.inset}
            variant={item.variant}
          >
            {item.label}
            {item.shortcut && (
              <ECDropdownMenuShortcut>{item.shortcut}</ECDropdownMenuShortcut>
            )}
          </ECDropdownMenuItem>
        );
      case "label":
        return (
          <ECDropdownMenuLabel key={index} inset={item.inset}>
            {item.label}
          </ECDropdownMenuLabel>
        );
      case "separator":
        return <ECDropdownMenuSeparator key={index} />;
      case "group":
        return (
          <ECDropdownMenuGroup key={index}>
            {renderDropdownChildren(item.items)}
            {/* Gọi đệ quy cho các mục trong group */}
          </ECDropdownMenuGroup>
        );
      case "submenu":
        return (
          <ECDropdownMenuCascadingMenu
            key={index}
            trigger={item.trigger}
            inset={item.inset}
          >
            {renderDropdownChildren(item.items)}
            {/* Gọi đệ quy cho các mục trong submenu */}
          </ECDropdownMenuCascadingMenu>
        );
      default:
        return null;
    }
  });
};

function Page() {
  return (
    <>
      <div>Form control component nè</div>
      <ECCollapsiable className="w-[350px] space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">
            @peduarte starred 3 repositories
          </h4>
          <ECCollapsibleTrigger asChild>
            <Button className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </ECCollapsibleTrigger>
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @radix-ui/primitives
        </div>
        <ECCollapsibleContent className="flex flex-col gap-8">
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            @radix-ui/colors
          </div>
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            @stitches/react
          </div>
        </ECCollapsibleContent>
      </ECCollapsiable>
      <div>Form control component nè</div>
      {/* <MCDropdownMenu>
        <MCDropdownMenuTrigger>
          <Button variant="outline">Open dropdown menu</Button>
        </MCDropdownMenuTrigger>
        <MCDropdownMenuContent className="w-56" side="right">
          <MCDropdownMenuLabel>My Account</MCDropdownMenuLabel>
          <MCDropdownMenuSeparator />
          <MCDropdownMenuGroup>
            <MCDropdownMenuItem>
              Profile
              <MCDropdownMenuShortcut>⇧⌘P</MCDropdownMenuShortcut>
            </MCDropdownMenuItem>
            <MCDropdownMenuItem>
              Billing
              <MCDropdownMenuShortcut>⌘B</MCDropdownMenuShortcut>
            </MCDropdownMenuItem>
            <MCDropdownMenuItem>
              Settings
              <MCDropdownMenuShortcut>⌘S</MCDropdownMenuShortcut>
            </MCDropdownMenuItem>
          </MCDropdownMenuGroup>
          <MCDropdownMenuGroup>
            <MCDropdownMenuItem>Team</MCDropdownMenuItem>
            <ECCascadingMenu trigger="Invite users">
              <MCDropdownMenuItem>Email</MCDropdownMenuItem>
              <MCDropdownMenuItem>Message</MCDropdownMenuItem>
              <MCDropdownMenuSeparator />
              <MCDropdownMenuItem>More...</MCDropdownMenuItem>
            </ECCascadingMenu>
          </MCDropdownMenuGroup>
        </MCDropdownMenuContent>
      </MCDropdownMenu> */}
      <ECDropdownMenu>
        <ECDropdownMenuTrigger asChild>
          <Button variant="outline">{myDropdownData.triggerText}</Button>
        </ECDropdownMenuTrigger>
        <ECDropdownMenuContent className="w-56" side="right">
          {renderDropdownChildren(myDropdownData.content)}
        </ECDropdownMenuContent>
      </ECDropdownMenu>
      <div className="h-8 w-full"></div>

      <ECSheet>
        <ECSheetTrigger asChild>
          <Button variant="outline">Open</Button>
        </ECSheetTrigger>
        <ECSheetContent>
          <ECSheetHeader>
            <ECSheetTitle>Edit profile</ECSheetTitle>
            <ECSheetDescription>
              Make changes to your profile here. Click save when you're done.
            </ECSheetDescription>
          </ECSheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <ECLabel htmlFor="name" className="text-right">
                Name
              </ECLabel>
              <ECInput id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <ECLabel htmlFor="username" className="text-right">
                Username
              </ECLabel>
              <ECInput id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <ECSheetFooter>
            <ECSheetClose asChild>
              <Button type="submit">Save changes</Button>
            </ECSheetClose>
          </ECSheetFooter>
        </ECSheetContent>
      </ECSheet>

      <ECTooltipProvider>
        <ECTooltip>
          <ECTooltipTrigger asChild>
            <Button variant="outline">Hover</Button>
          </ECTooltipTrigger>
          <ECTooltipContent side="top">
            <p>Add to library</p>
          </ECTooltipContent>
        </ECTooltip>
      </ECTooltipProvider>

      <ECTooltipProvider>
        <ECTooltip>
          <ECTooltipTrigger asChild>
            <Button variant="outline">Hover</Button>
          </ECTooltipTrigger>
          <ECTooltipContent side="bottom">
            <p>Add to library</p>
          </ECTooltipContent>
        </ECTooltip>
      </ECTooltipProvider>

      <ECTooltipProvider>
        <ECTooltip>
          <ECTooltipTrigger asChild>
            <Button variant="outline">Hover</Button>
          </ECTooltipTrigger>
          <ECTooltipContent side="right">
            <p>Add to library</p>
          </ECTooltipContent>
        </ECTooltip>
      </ECTooltipProvider>

      <div className="h-8"></div>

      <div className="flex items-center space-x-4">
        <ECSkeleton className="h-48 w-48 rounded-full" />
        <div className="space-y-2">
          <ECSkeleton className="h-24 w-[250px]" />
          <ECSkeleton className="h-24 w-[200px]" />
        </div>
      </div>

      <div className="h-8"></div>

      <ECInput>{/* <span>123</span> */}</ECInput>
      <ECInput disabled prefix="123" />

      <div className="h-8"></div>

      <div className="flex w-[300px] flex-col gap-8 px-8">
        <MCTextFiled
          prefix={
            <div className="">
              <ECIconLoader name="search" />
            </div>
          }
          postfix={
            <div className="">
              <ECIconLoader name="command" />
            </div>
          }
          placeholder="Search"
        />
        <MCTextFiled
          prefix={
            <div className="">
              <ECIconLoader name="search" />
            </div>
          }
          postfix={
            <div className="">
              <ECIconLoader name="command" />
            </div>
          }
          placeholder="Search"
          disabled
        />

        <MCTextFiled
          prefix={
            <div className="">
              <ECIconLoader name="search" />
            </div>
          }
          postfix={
            <div className="">
              <ECIconLoader name="command" />
            </div>
          }
          addonAfter={
            <div className="rounded-r-8 bg-secondary-blue h-full px-4">
              Search
            </div>
          }
          placeholder="Search"
        />
      </div>

      <ECLabel>Label</ECLabel>
      <ECSeparator />
    </>
  );
}

export default Page;
