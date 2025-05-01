import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronRightIcon } from "lucide-react";
import { cn } from "@/composables/lib/utils";

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
        // "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
        // State-based styling
        "data-[state=open]:bg-black-5 data-[state=open]:text-black-100",

        // Flex container properties
        "flex items-center",

        // Sizing and spacing
        "rounded-4 px-8 py-4",

        // Typography
        "text-black-100 typography-regular-14",

        // Interactivity
        "cursor-pointer outline-hidden",

        // Positioning adjustments
        "data-[inset]:pl-8",

        // User-provided class override
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

export default DropdownMenuSubTrigger;
