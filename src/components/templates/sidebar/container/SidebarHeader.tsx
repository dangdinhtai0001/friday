import { cn } from "@/composables/utils/shadcn";

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col", className)}
      {...props}
    />
  );
}

export default SidebarHeader;
