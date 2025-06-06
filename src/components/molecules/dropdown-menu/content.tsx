import { cn } from "@/composables/utils/shadcn";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { motion } from "motion/react";
import { getMenuContentVariants } from "./variant";

function DropdownMenuContent({
  className,
  sideOffset = 4,
  side,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  const motionVariants = getMenuContentVariants(side);

  return (
    <DropdownMenuPrimitive.Portal >
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn("z-50", className)}
        side={side}
        {...props}
      >
        <motion.div
          variants={motionVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={cn(
            "rounded-16 bg-white-80 backdrop-blur-40 p-8 shadow-lg",
            className,
          )}
        >
          {children}
        </motion.div>
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}

export default DropdownMenuContent;
