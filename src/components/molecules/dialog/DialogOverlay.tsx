

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/composables/lib/utils";

const DialogOverlay = React.forwardRef<React.ComponentRef<typeof DialogPrimitive.Overlay>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            // "data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 ",
            "fixed inset-0", // Positioning and Layout
            "z-50", // Z-Index
            "bg-gradient-to-t from-background-3/70 to-background-4/70 backdrop-blur-4", // Background and Transparency
            "data-[state=open]:animate-in data-[state=open]:fade-in-0", // Animation States (Open)
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0", // Animation States (Closed)
            className
        )}
        {...props}
    />
));

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
export { DialogOverlay };