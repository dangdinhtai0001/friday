import { cn } from "@/composables/utils/shadcn";

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn(
        "group/menu-item rounded-16 relative gap-12 p-12 hover:bg-black-5 typography-regular-14 cursor-pointer",
        className,
      )}
      {...props}
    />
  );
}

export default SidebarMenuItem;
