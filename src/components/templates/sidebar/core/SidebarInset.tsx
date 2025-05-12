import { cn } from "@/composables/utils/shadcn";
import { useSidebarContext } from "../context/SidebarContext";
import { motion } from "motion/react";
import { SIDEBAR_TRANSITION_DURATION } from "../constants";

interface SidebarInsetProps
  extends Omit<
    React.ComponentProps<"main">,
    "onDrag" | "onDragEnd" | "onDragStart" | "onAnimationStart"
  > {
  className?: string;
}

function SidebarInset({ className, children, ...props }: SidebarInsetProps) {
  const { state } = useSidebarContext();
  const { open, collapsedWidth, expandedWidth } = state;

  const insetVariants = {
    expanded: {
      width: `calc(100vw - ${expandedWidth})`,
      marginLeft: expandedWidth,
    },
    collapsed: {
      width: `calc(100vw - ${collapsedWidth})`,
      marginLeft: collapsedWidth,
    },
  };

  return (
    <motion.main
      data-slot="sidebar-inset"
      className={cn("relative flex w-full flex-1 flex-col", className)}
      variants={insetVariants}
      animate={open ? "expanded" : "collapsed"}
      transition={{
        duration: SIDEBAR_TRANSITION_DURATION,
        type: "tween",
        ease: "easeInOut",
      }}
      {...props}
    >
      {children}
    </motion.main>
  );
}

export default SidebarInset;
