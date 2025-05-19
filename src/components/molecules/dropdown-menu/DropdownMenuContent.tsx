import { cn } from "@/composables/utils/shadcn";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { motion } from "motion/react";

const getMotionVariants = (
  side: React.ComponentProps<typeof DropdownMenuPrimitive.Content>["side"],
) => ({
  hidden: {
    opacity: 0,
    ...(side === "left" && { x: 8 }), // Slide từ phải sang trái
    ...(side === "right" && { x: -8 }), // Slide từ trái sang phải
    ...(side === "top" && { y: 8 }), // Slide từ dưới lên
    ...(side === "bottom" && { y: -8 }), // Slide từ trên xuống
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
});

function DropdownMenuContent({
  className,
  sideOffset = 4,
  side,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  const motionVariants = getMotionVariants(side);

  return (
    <DropdownMenuPrimitive.Portal>
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
            "rounded-16 bg-white-80 shadow-black-100/1 backdrop-blur-40 p-16 shadow-lg",
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
