import { SidebarProps } from "../sidebar.type";
import { useSidebarContext } from "../context/SidebarContext";
import { cn } from "@/composables/utils/shadcn";
import { PropsWithChildren } from "react";
import { motion } from "motion/react";
import { SIDEBAR_TRANSITION_DURATION } from "../constants";

function Sidebar({ children }: PropsWithChildren<SidebarProps>) {
  const { state } = useSidebarContext();
  const { open, expandedWidth, collapsedWidth } = state;

  const sidebarWidthVariants = {
    expanded: { width: expandedWidth },
    collapsed: { width: collapsedWidth },
  };

  return (
    <motion.aside
      className={cn("fixed top-0 z-10 h-screen")}
      variants={sidebarWidthVariants}
      animate={open ? "expanded" : "collapsed"}
      transition={{
        duration: SIDEBAR_TRANSITION_DURATION,
        type: "tween",
        ease: "easeInOut",
      }}
    >
      <div
        data-sidebar="sidebar"
        data-slot="sidebar-inner"
        className="bg-background-2 flex h-full w-full flex-col px-16 pb-28"
      >
        {children}
      </div>
    </motion.aside>
  );
}

export default Sidebar;
