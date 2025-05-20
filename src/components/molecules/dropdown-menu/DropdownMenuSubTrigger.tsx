import { cn } from "@/composables/utils/shadcn";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { IconLoader } from "@/components/atoms/icon-loader";

function DropdownMenuSubTrigger({
    className,
    inset,
    children,
    ...props
  }: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }) {
    return (
      <DropdownMenuPrimitive.SubTrigger
        data-slot="dropdown-menu-sub-trigger"
        data-inset={inset}
        className={cn(
          "hover:bg-black-5 rounded-8 typography-regular-14 flex cursor-pointer items-center justify-between gap-8 p-8 focus:ring-0 focus:outline-none",
          className,
        )}
        {...props}
      >
        {children}
        <IconLoader name="chevron-right" />
      </DropdownMenuPrimitive.SubTrigger>
    );
  }

  export default DropdownMenuSubTrigger;