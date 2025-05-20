import { cn } from "@/composables/utils/shadcn";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { motion } from "motion/react";
import { getMenuContentVariants } from "./MotionVariant";

function DropdownMenuSubContent({
  className,
  children,
  sideOffset=20,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  const motionVariants = getMenuContentVariants("bottom");

  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn("z-50", className)}
      sideOffset={sideOffset}
      {...props}
    >
      <motion.div
          variants={motionVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={cn(
            "rounded-16 bg-white-80 backdrop-blur-40 p-16 shadow-lg",
            className,
          )}
        >
          {children}
        </motion.div>
    </DropdownMenuPrimitive.SubContent>
  );
}

export default DropdownMenuSubContent;
