import { IconLoader } from "@/components/atoms/icon-loader";
import { motion } from "motion/react";

interface SidebarItemContentProps {
  icon: string | React.ReactNode | undefined;
  title: string | undefined;
  isExpanded: boolean;
}

function SidebarItemContent({
  icon,
  title,
  isExpanded,
}: SidebarItemContentProps) {
  return (
    <>
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
            <>{icon}</>
          )}
        </motion.div>
      )}
      <motion.span
        className="overflow-hidden text-ellipsis whitespace-nowrap"
        initial={{ opacity: 1, x: 0 }}
        animate={{
          opacity: isExpanded ? 1 : 0,
          x: isExpanded ? 0 : -20,
          width: isExpanded ? "auto" : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {title && <>{title}</>}
      </motion.span>
    </>
  );
}

export default SidebarItemContent;
