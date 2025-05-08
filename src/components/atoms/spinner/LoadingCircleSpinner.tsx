import { cn } from "@/composables/utils/shadcn";
import { motion } from "motion/react";

function LoadingCircleSpinner({ className }: { className: string }) {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={cn(
          "spinner border-black-20 border-t-black-100 size-16 rounded-full border-3",
          className,
        )}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

export default LoadingCircleSpinner;
