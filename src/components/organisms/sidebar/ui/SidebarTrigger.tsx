import * as React from "react";
import { cn } from "@/composables/utils/shadcn"; // Giả định đường dẫn
import { useSidebarContext } from "../context/SidebarContext"; // Import hook context
import { motion } from "motion/react";
import { Button } from "@/components/atoms/button";
import { ECIconLoader } from "@/components/atoms/icon-loader";
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
  "onClick" | "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"
> & {
  onToggleSidebar?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const SidebarTrigger = React.forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  (
    {
      className,
      children,
      onToggleSidebar,
      ...props
    },
    ref,
  ) => {
    const { state, actions } = useSidebarContext();

    return (
      <MotionButton
        ref={ref}
        type="button" // Đảm bảo là type="button"
        aria-label="Toggle Sidebar"
        className={cn(
          "flex items-center justify-center",
          "focus-visible:ring-ring focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          // "bg-background hover:bg-muted/50 focus-visible:ring-ring inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          // "md:group-data-[collapsible=none]:invisible md:group-data-[collapsible=offcanvas]:invisible", // Ẩn khi offcanvas hoặc none
          className,
        )}
        data-sidebar="trigger"
        data-slot="sidebar-trigger"
        variant="icon"
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
          <ECIconLoader
            name="layout-sidebar-right-collapse"
            className="size-24"
          />
        )}
      </MotionButton>
    );
  },
);

SidebarTrigger.displayName = "SidebarTrigger";

export { SidebarTrigger };
