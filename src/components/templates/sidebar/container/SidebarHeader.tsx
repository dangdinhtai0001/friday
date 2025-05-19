import { cn } from "@/composables/utils/shadcn";
import { useSidebarContext } from "../context/SidebarContext";

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  const { state } = useSidebarContext();
  const { headerHeight, open } = state;

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
        height: headerHeight,
      }}
      {...props}
    />
  );
}

export default SidebarHeader;
