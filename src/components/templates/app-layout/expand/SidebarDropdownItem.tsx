import React from "react";
import { IconLoader } from "@/components/atoms/icon-loader";
import {
  ECCascadingMenu,
  MCDropdownMenu,
  MCDropdownMenuContent,
  MCDropdownMenuItem,
  MCDropdownMenuLabel,
  MCDropdownMenuSeparator,
  MCDropdownMenuShortcut,
  MCDropdownMenuTrigger,
} from "@/components/molecules/dropdown-menu";
import {
  MCTooltip,
  MCTooltipContent,
  MCTooltipProvider,
  MCTooltipTrigger,
} from "@/components/molecules/tooltip";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/organisms/sidebar2";

// Định nghĩa kiểu cho một mục Dropdown đơn giản (Link)
interface DropdownLinkItem {
  type: "link";
  text: string;
  icon?: string;
  link?: string;
  shortcut?: string; // Ví dụ thêm shortcut
}

// Định nghĩa kiểu cho một mục Dropdown là Submenu Trigger
interface DropdownSubmenuItem {
  type: "submenu";
  text: string;
  icon?: string;
  submenuItems: DropdownMenuItemType[]; // Mảng các mục con, có thể là link hoặc submenu khác
}

// Định nghĩa kiểu cho Separator và Label nếu bạn muốn hỗ trợ chúng qua dữ liệu
interface DropdownSeparator {
  type: "separator";
}

interface DropdownLabel {
  type: "label";
  text: string;
}

// Kiểu chung cho bất kỳ mục nào trong dropdown
export type DropdownMenuItemType =
  | DropdownLinkItem
  | DropdownSubmenuItem
  | DropdownSeparator
  | DropdownLabel;

/**
 * @interface SidebarDropdownItemProps
 * @description Định nghĩa props cho component SidebarDropdownItem.
 * @property {string} triggerIconName - Tên icon cho nút trigger của dropdown chính.
 * @property {DropdownMenuItemType[]} dropdownItems - Mảng các mục con sẽ hiển thị trong dropdown chính.
 */
interface SidebarDropdownItemProps {
  iconName: string;
  tooltip?: string | React.ReactNode;
  dropdownItems: DropdownMenuItemType[];
}

function DropdownMenuItemRenderer({ item }: { item: DropdownMenuItemType }) {
  switch (item.type) {
    case "link": {
      const linkItem = item as DropdownLinkItem;

      return (
        <MCDropdownMenuItem className="rounded-12 gap-4 p-8">
          {linkItem.link ? (
            <a href={linkItem.link} className="w-full">
              <SidebarMenuButton
                icon={linkItem.icon || undefined}
                text={linkItem.text}
              />
            </a>
          ) : (
            <SidebarMenuButton
              icon={linkItem.icon || undefined}
              text={linkItem.text}
            />
          )}
          {linkItem.shortcut && (
            <MCDropdownMenuShortcut>{linkItem.shortcut}</MCDropdownMenuShortcut>
          )}
        </MCDropdownMenuItem>
      );
    }
    case "submenu": {
      const submenuItem = item as DropdownSubmenuItem;
      return (
        <ECCascadingMenu trigger={submenuItem.text} key={submenuItem.text}>
          {" "}
          {/* Sử dụng text làm key đơn giản */}
          {/* ĐỆ QUY Ở ĐÂY: Gọi lại DropdownMenuContentRenderer cho các mục con */}
          <DropdownMenuContentRenderer items={submenuItem.submenuItems} />
        </ECCascadingMenu>
      );
    }
    case "separator": {
      return <MCDropdownMenuSeparator />;
    }

    case "label": {
      const labelItem = item as DropdownLabel;
      return <MCDropdownMenuLabel>{labelItem.text}</MCDropdownMenuLabel>;
    }

    default:
      return null;
  }
}

interface DropdownMenuContentRendererProps {
  items: DropdownMenuItemType[];
}

function DropdownMenuContentRenderer({
  items,
}: DropdownMenuContentRendererProps) {
  return (
    <>
      {items.map((item, index) => (
        <DropdownMenuItemRenderer key={index} item={item} />
      ))}
    </>
  );
}

function SidebarDropdownItem({
  iconName,
  tooltip,
  dropdownItems,
}: SidebarDropdownItemProps) {
  const renderTrigger = () => {
    return (
      <MCDropdownMenuTrigger
        asChild
        className="rounded-12 flex w-full justify-center"
      >
        <SidebarMenuButton
          icon={<IconLoader name={iconName} className="size-24" />}
          className="hover:bg-black-100/4 aspect-square w-full max-w-48"
        />
      </MCDropdownMenuTrigger>
    );
  };

  const renderTrigger2 = () => {
    if (tooltip) {
      return (
        <MCTooltipProvider>
          <MCTooltip>
            <MCTooltipTrigger asChild>{renderTrigger()}</MCTooltipTrigger>

            <MCTooltipContent side="right">{tooltip}</MCTooltipContent>
          </MCTooltip>
        </MCTooltipProvider>
      );
    }

    return renderTrigger();
  };

  return (
    <>
      <MCDropdownMenu>
        <SidebarMenuItem>
          {renderTrigger2()}

          <MCDropdownMenuContent className="w-56" side="right">
            {/* SỬ DỤNG COMPONENT RENDER ĐỆ QUY Ở ĐÂY */}
            <DropdownMenuContentRenderer items={dropdownItems} />
          </MCDropdownMenuContent>
        </SidebarMenuItem>
      </MCDropdownMenu>
    </>
  );
}

export default SidebarDropdownItem;
