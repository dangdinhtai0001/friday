import { Button } from "@/components/atoms/button";
import { useSidebarContext } from "../context/SidebarContext";
import { cn } from "@/composables/utils/shadcn";
import { IconLoader } from "@/components/atoms/icon-loader";
import { motion } from "motion/react";
import { SIDEBAR_TRANSITION_DURATION } from "../constants";

const iconTransition = {
  duration: SIDEBAR_TRANSITION_DURATION,
  type: "spring",
  stiffness: 200,
  damping: 20,
};

const rotationVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { state, actions } = useSidebarContext();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="icon"
      className={cn("size-28 flex items-center justify-center", className)}
      onClick={(event) => {
        onClick?.(event);
        actions.toggleSidebar();
      }}
      {...props}
    >
      <motion.div
        variants={rotationVariants}
        animate={state.open ? "open" : "closed"}
        transition={iconTransition}
        className=""
      >
        <IconLoader name="layout-sidebar-right-collapse" className="size-28" />
      </motion.div>
    </Button>
  );
}

export default SidebarTrigger;
