import { IconLoader } from "@/components/atoms/icon-loader";
import { cn } from "@/composables/utils/shadcn";
import { motion } from "motion/react";
import { Link } from "react-router";

interface SidebarItemContentProps {
  icon?: string | React.ReactNode;
  title?: string;
  isExpanded: boolean;
  showNavigationIcon?: boolean;
  className?: string;
  url?: string;
}

function SidebarItemContent({
  icon = "placeholder",
  title,
  isExpanded,
  showNavigationIcon = false,
  url,
  className,
}: SidebarItemContentProps) {
  const textAnimationProps = {
    initial: { opacity: 1, x: 0 },
    animate: {
      opacity: isExpanded ? 1 : 0,
      x: isExpanded ? 0 : -20,
      width: isExpanded ? "auto" : 0,
    },
    transition: { duration: 0.2, ease: "easeInOut" },
  };

  const renderContent = () => (
    <div
      className={cn(
        "flex h-full w-full cursor-pointer items-center gap-8",
        showNavigationIcon ? "justify-between" : "justify-start",
        className,
      )}
    >
      {/* Icon Section */}
      {icon && (
        <motion.div
          animate={{
            x: 0,
            scale: isExpanded ? 1 : 1.1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            mass: 0.8,
          }}
        >
          {typeof icon === "string" ? (
            <IconLoader name={icon} className="size-24" />
          ) : (
            icon
          )}
        </motion.div>
      )}

      {/* Title Section */}
      <motion.div
        className="overflow-hidden text-ellipsis whitespace-nowrap"
        {...textAnimationProps}
      >
        {title}
      </motion.div>

      {/* Navigation Icon Section */}
      {showNavigationIcon && (
        <motion.div
          className="overflow-hidden text-ellipsis whitespace-nowrap"
          {...textAnimationProps}
        >
          <IconLoader name={"chevron-right"} className="text-black-20" />
        </motion.div>
      )}
    </div>
  );

  return url ? <Link to={url}>{renderContent()}</Link> : renderContent();
}

export default SidebarItemContent;
