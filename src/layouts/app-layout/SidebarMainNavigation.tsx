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
  MCSidebarMenu,
  MCSidebarMenuButton,
  MCSidebarMenuItem,
} from "@/components/organisms/sidebar";
import SidebarItemContent from "./SidebarItemContent";
import { motion } from "motion/react";
import sidebarNavigationData, { DropdownMenuChild } from "./config";
import { Link } from "react-router";

export type SidebarMainNavigationProps = {
  isSidebarExpanded: boolean;
};

const MotionMCDropdownMenuItem = motion.create(MCDropdownMenuItem);

const renderDropdownChildren = (
  items: DropdownMenuChild[],
): React.ReactNode[] => {
  return items.map((item, index) => {
    switch (item.type) {
      case "item":
        return (
          <MotionMCDropdownMenuItem
            className="min-w-[212px] p-12"
            key={index}
            onClick={item.onClick}
            inset={item.inset}
            variant={item.variant}
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link to={item.url || "/123"}>
              {item.label}
              {item.shortcut && (
                <MCDropdownMenuShortcut>{item.shortcut}</MCDropdownMenuShortcut>
              )}
            </Link>
          </MotionMCDropdownMenuItem>
        );
      case "label":
        return (
          <MCDropdownMenuLabel key={index} inset={item.inset} className="p-12">
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
            sideOffset={16}
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

function SidebarMainNavigation({
  isSidebarExpanded,
}: SidebarMainNavigationProps) {
  return (
    <>
      <MCSidebarMenu>
        {sidebarNavigationData.map((item, index) => (
          <MCSidebarMenuItem key={index}>
            {/* Nếu mục có 'content', nó sẽ trở thành một dropdown/submenu */}
            {item.content && item.content.length > 0 ? (
              <MCDropdownMenu>
                <MCDropdownMenuTrigger asChild>
                  <MCSidebarMenuButton
                    className="flex w-full items-center justify-start gap-8"
                    tooltip={isSidebarExpanded ? undefined : item.tooltip}
                  >
                    <SidebarItemContent
                      icon={item.icon}
                      title={item.title}
                      isExpanded={isSidebarExpanded}
                      showNavigationIcon
                    />
                  </MCSidebarMenuButton>
                </MCDropdownMenuTrigger>
                <MCDropdownMenuContent className="min-w-[150px]" side="right">
                  {renderDropdownChildren(item.content)}
                </MCDropdownMenuContent>
              </MCDropdownMenu>
            ) : (
              // Nếu không có 'content', đây là một mục sidebar đơn giản
              <MCSidebarMenuButton
                className="flex w-full items-center justify-start gap-8"
                tooltip={isSidebarExpanded ? undefined : item.tooltip}
              >
                <SidebarItemContent
                  icon={item.icon}
                  title={item.title}
                  isExpanded={isSidebarExpanded}
                  url={item.url}
                />
              </MCSidebarMenuButton>
            )}
          </MCSidebarMenuItem>
        ))}
      </MCSidebarMenu>
    </>
  );
}

export default SidebarMainNavigation;
