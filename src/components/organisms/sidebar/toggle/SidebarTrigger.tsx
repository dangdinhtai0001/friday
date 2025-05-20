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

const MotionButton = motion.create(Button);

export type SidebarTriggerProps = Omit<
  React.ComponentProps<typeof Button>,
  "onClick"
> & {
  onToggleSidebar?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function SidebarTrigger({
  className,
  children,
  onToggleSidebar,
  ...props
}: SidebarTriggerProps) {
  const { state, actions } = useSidebarContext();

  return (
    <MotionButton
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="icon"
      className={cn("flex items-center justify-center", className)}
      onClick={(event) => {
        onToggleSidebar?.(event);
        actions.toggleSidebar();
      }}
      variants={rotationVariants}
      animate={state.open ? "open" : "closed"}
      transition={iconTransition}
      {...props}
    >
      {children ?? (
        <IconLoader name="layout-sidebar-right-collapse" className="size-24" />
      )}
    </MotionButton>
  );
}

export default SidebarTrigger;
