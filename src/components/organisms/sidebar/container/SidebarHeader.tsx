import { cn } from "@/composables/utils/shadcn";
import { useSidebarContext } from "../context/SidebarContext";
import { SIDEBAR_HEADER_HEIGHT } from "../constants";

export type SidebarHeaderProps = React.ComponentProps<"div"> & {
  height?: string;
};

function SidebarHeader({
  className,
  height = SIDEBAR_HEADER_HEIGHT,
  ...props
}: SidebarHeaderProps) {
  const { state } = useSidebarContext();
  const { open } = state;

  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn(
        "sticky top-0 flex",
        open ? "" : "items-center justify-center",
        className,
      )}
      style={{
        height: height,
      }}
      {...props}
    />
  );
}

export default SidebarHeader;
