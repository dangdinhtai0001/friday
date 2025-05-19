import { cn } from "@/composables/utils/shadcn";
import { Slot } from "@radix-ui/react-slot";

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn("", className)}
      {...props}
    />
  );
}

export default SidebarGroupAction;
