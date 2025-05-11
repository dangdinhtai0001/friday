import * as React from "react";
import { cn } from "@/composables/utils/shadcn";
import { motion } from "motion/react";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "rounded-12 bg-black-100/4 relative overflow-hidden",
        className,
      )}
      {...props}
    >
      {/* Shimmer effect */}
      <motion.div
        className="via-black-10 absolute top-0 left-0 h-full w-[200%] bg-gradient-to-r from-transparent to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        exit={{ x: "100%" }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export default Skeleton;
