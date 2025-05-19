import { cn } from "@/composables/utils/shadcn";
import { Slot } from "@radix-ui/react-slot";

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "rounded-8 typography-regular-14 text-black-40",
        className,
      )}
      {...props}
    />
  );
}

export default SidebarGroupLabel;
