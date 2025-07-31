import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/composables/utils/shadcn";
import { motion } from "motion/react";

function TooltipContent({
  className,
  sideOffset = 4,
  side,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  const motionVariants = getMotionVariants(side);

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        className="z-50"
        sideOffset={sideOffset}
        side={side}
        {...props}
      >
        <motion.div
          variants={motionVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={cn(
            "bg-black-80 rounded-8 text-white-100 typography-regular-12 px-8 py-4",
            className,
          )}
        >
          {children}
          <TooltipPrimitive.Arrow className="fill-black-80" />
        </motion.div>
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

const getMotionVariants = (
  side: React.ComponentProps<typeof TooltipPrimitive.Content>["side"],
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

export default TooltipContent;
