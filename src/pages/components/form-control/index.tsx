import { IconLoader } from "@/components/atoms/icon-loader";
import { MCInput } from "@/components/atoms/input";
import { MCLabel } from "@/components/atoms/label";
import { MCTextFiled } from "@/components/atoms/text-field";
import { MCSeparator } from "@/components/atoms/separator";
import {
  MCTooltip,
  MCTooltipContent,
  MCTooltipProvider,
  MCTooltipTrigger,
} from "@/components/molecules/tooltip";
import { Button } from "@/components/atoms/button";
import { MCSkeleton } from "@/components/atoms/skeleton";
import {
  MCSheet,
  MCSheetClose,
  MCSheetContent,
  MCSheetDescription,
  MCSheetFooter,
  MCSheetHeader,
  MCSheetTitle,
  MCSheetTrigger,
} from "@/components/organisms/sheet";
import {
  ECCascadingMenu,
  MCDropdownMenu,
  MCDropdownMenuContent,
  MCDropdownMenuGroup,
  MCDropdownMenuItem,
  MCDropdownMenuLabel,
  MCDropdownMenuSeparator,
  MCDropdownMenuShortcut,
  MCDropdownMenuTrigger,
} from "@/components/molecules/dropdown-menu";
import {
  MCCollapsibleContent,
  MCCollapsiable,
  MCCollapsibleTrigger,
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
          <MCDropdownMenuItem
            key={index}
            onClick={item.onClick}
            inset={item.inset}
            variant={item.variant}
          >
            {item.label}
            {item.shortcut && (
              <MCDropdownMenuShortcut>{item.shortcut}</MCDropdownMenuShortcut>
            )}
          </MCDropdownMenuItem>
        );
      case "label":
        return (
          <MCDropdownMenuLabel key={index} inset={item.inset}>
            {item.label}
          </MCDropdownMenuLabel>
        );
      case "separator":
        return <MCDropdownMenuSeparator key={index} />;
      case "group":
        return (
          <MCDropdownMenuGroup key={index}>
            {renderDropdownChildren(item.items)}
            {/* Gọi đệ quy cho các mục trong group */}
          </MCDropdownMenuGroup>
        );
      case "submenu":
        return (
          <ECCascadingMenu
            key={index}
            trigger={item.trigger}
            inset={item.inset}
          >
            {renderDropdownChildren(item.items)}
            {/* Gọi đệ quy cho các mục trong submenu */}
          </ECCascadingMenu>
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
      <MCCollapsiable className="w-[350px] space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">
            @peduarte starred 3 repositories
          </h4>
          <MCCollapsibleTrigger asChild>
            <Button className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </MCCollapsibleTrigger>
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @radix-ui/primitives
        </div>
        <MCCollapsibleContent className="flex flex-col gap-8">
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            @radix-ui/colors
          </div>
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            @stitches/react
          </div>
        </MCCollapsibleContent>
      </MCCollapsiable>
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
      <MCDropdownMenu>
        <MCDropdownMenuTrigger asChild>
          <Button variant="outline">{myDropdownData.triggerText}</Button>
        </MCDropdownMenuTrigger>
        <MCDropdownMenuContent className="w-56" side="right">
          {renderDropdownChildren(myDropdownData.content)}
        </MCDropdownMenuContent>
      </MCDropdownMenu>
      <div className="h-8 w-full"></div>

      <MCSheet>
        <MCSheetTrigger asChild>
          <Button variant="outline">Open</Button>
        </MCSheetTrigger>
        <MCSheetContent>
          <MCSheetHeader>
            <MCSheetTitle>Edit profile</MCSheetTitle>
            <MCSheetDescription>
              Make changes to your profile here. Click save when you're done.
            </MCSheetDescription>
          </MCSheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <MCLabel htmlFor="name" className="text-right">
                Name
              </MCLabel>
              <MCInput id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <MCLabel htmlFor="username" className="text-right">
                Username
              </MCLabel>
              <MCInput id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <MCSheetFooter>
            <MCSheetClose asChild>
              <Button type="submit">Save changes</Button>
            </MCSheetClose>
          </MCSheetFooter>
        </MCSheetContent>
      </MCSheet>

      <MCTooltipProvider>
        <MCTooltip>
          <MCTooltipTrigger asChild>
            <Button variant="outline">Hover</Button>
          </MCTooltipTrigger>
          <MCTooltipContent side="top">
            <p>Add to library</p>
          </MCTooltipContent>
        </MCTooltip>
      </MCTooltipProvider>

      <MCTooltipProvider>
        <MCTooltip>
          <MCTooltipTrigger asChild>
            <Button variant="outline">Hover</Button>
          </MCTooltipTrigger>
          <MCTooltipContent side="bottom">
            <p>Add to library</p>
          </MCTooltipContent>
        </MCTooltip>
      </MCTooltipProvider>

      <MCTooltipProvider>
        <MCTooltip>
          <MCTooltipTrigger asChild>
            <Button variant="outline">Hover</Button>
          </MCTooltipTrigger>
          <MCTooltipContent side="right">
            <p>Add to library</p>
          </MCTooltipContent>
        </MCTooltip>
      </MCTooltipProvider>

      <div className="h-8"></div>

      <div className="flex items-center space-x-4">
        <MCSkeleton className="h-48 w-48 rounded-full" />
        <div className="space-y-2">
          <MCSkeleton className="h-24 w-[250px]" />
          <MCSkeleton className="h-24 w-[200px]" />
        </div>
      </div>

      <div className="h-8"></div>

      <MCInput>{/* <span>123</span> */}</MCInput>
      <MCInput disabled prefix="123" />

      <div className="h-8"></div>

      <div className="flex w-[300px] flex-col gap-8 px-8">
        <MCTextFiled
          prefix={
            <div className="">
              <IconLoader name="search" />
            </div>
          }
          postfix={
            <div className="">
              <IconLoader name="command" />
            </div>
          }
          placeholder="Search"
        />
        <MCTextFiled
          prefix={
            <div className="">
              <IconLoader name="search" />
            </div>
          }
          postfix={
            <div className="">
              <IconLoader name="command" />
            </div>
          }
          placeholder="Search"
          disabled
        />

        <MCTextFiled
          prefix={
            <div className="">
              <IconLoader name="search" />
            </div>
          }
          postfix={
            <div className="">
              <IconLoader name="command" />
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

      <MCLabel>Label</MCLabel>
      <MCSeparator />
    </>
  );
}

export default Page;
