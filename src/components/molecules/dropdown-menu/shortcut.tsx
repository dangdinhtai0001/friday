import { cn } from "@/composables/utils/shadcn";

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn("", className)}
      {...props}
    />
  );
}

export default DropdownMenuShortcut;
