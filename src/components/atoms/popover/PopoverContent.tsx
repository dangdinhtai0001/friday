import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "@/composables/lib/utils";

function PopoverContent({
    className,
    align = "center",
    sideOffset = 4,
    ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
    return (
        <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
                data-slot="popover-content"
                align={align}
                sideOffset={sideOffset}
                className={cn(
                    // "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
                    // Base Styling
                    // "bg-popover text-popover-foreground border p-4 rounded-md shadow-md outline-hidden",
                    "border rounded-8 px-4 py-2 gap-4 border-black-10 backdrop-blur-40 shadow-8 outline-hidden",

                    // Animations
                    "data-[state=open]:animate-in data-[state=closed]:animate-out",
                    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",

                    // Positioning (Slide-in from different sides)
                    "data-[side=bottom]:slide-in-from-top-2",
                    "data-[side=left]:slide-in-from-right-2",
                    "data-[side=right]:slide-in-from-left-2",
                    "data-[side=top]:slide-in-from-bottom-2",

                    // Utility Classes
                    // "z-50 w-72 origin-(--radix-popover-content-transform-origin)",
                    className
                )}
                {...props}
            />
        </PopoverPrimitive.Portal>
    )
}

export default PopoverContent;  