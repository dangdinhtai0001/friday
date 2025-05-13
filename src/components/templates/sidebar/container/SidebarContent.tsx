import { cn } from "@/composables/utils/shadcn";
import { SidebarContentProps } from "../sidebar.type";

function SidebarContent({
  className,
  children,
  ...props
}: SidebarContentProps) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default SidebarContent;
