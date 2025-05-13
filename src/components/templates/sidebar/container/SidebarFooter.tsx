import { cn } from "@/composables/utils/shadcn";

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn(
        "sticky bottom-0 flex w-full flex-col items-center justify-center bg-gray-100 p-4 dark:bg-gray-800",
        className,
      )}
      {...props}
    />
  );
}

export default SidebarFooter;
