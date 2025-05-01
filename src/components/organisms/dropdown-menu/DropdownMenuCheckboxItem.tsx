import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@/composables/lib/utils";
import { IconLoader } from "@/components/atoms/icon-loader";

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        // "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // Layout & positioning
        "relative flex items-center",

        // Spacing
        "gap-2 px-8 py-4",

        // Typography
        "text-black-100 typography-regular-14",

        // Interactivity
        "cursor-pointer",

        // Disabled state
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",

        // SVG styling
        // "[&_svg]:pointer-events-none [&_svg]:shrink-0",

        // Accessibility
        "rounded-8 outline-hidden",

        // User-provided class override
        className,
      )}
      checked={checked}
      {...props}
    >
      {checked && (
        <div className="pointer-events-none left-2 flex size-3.5 items-center justify-center">
          <DropdownMenuPrimitive.ItemIndicator>
            <IconLoader name="check" className="size-16" />
          </DropdownMenuPrimitive.ItemIndicator>
        </div>
      )}

      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

export default DropdownMenuCheckboxItem;
