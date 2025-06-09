import { cn } from "@/composables/utils/shadcn";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ECIconLoader } from "@/components/atoms/icon-loader";

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
          "hover:bg-black-4 rounded-8 typography-regular-14 flex cursor-pointer items-center justify-between gap-8 px-8 py-4 focus:ring-0 focus:outline-none",
          className,
        )}
        {...props}
      >
        {children}
        <ECIconLoader name="chevron-right" />
      </DropdownMenuPrimitive.SubTrigger>
    );
  }

  export default DropdownMenuSubTrigger;