import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/organisms/sidebar2";
import CollapsedSidebarContent from "./collapse/CollapsedSidebarContent";
import ExpandedSidebarContent from "./expand/ExpandedSidebarContent";
import { motion, AnimatePresence } from "motion/react";

// --- Cấu hình animation variants ---

// Định nghĩa animation cho nội dung di chuyển từ trái sang phải
const slideInFromLeft = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 100, opacity: 0 }, // Biến mất sang phải
};

// Định nghĩa animation cho nội dung di chuyển từ phải sang trái
const slideInFromRight = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 }, // Biến mất sang trái
};

const transition = { duration: 0.3, type: "spring" };

// --- Component AppSidebar ---
function AppSidebar({
  isSidebarExpanded,
  ...props
}: React.ComponentProps<typeof Sidebar> & { isSidebarExpanded: boolean }) {
  return (
    <Sidebar {...props} className="bg-background-2">
      <SidebarHeader>
        <div className="typography-regular-24 flex h-[68px] w-full items-center justify-start gap-12">
          HEADER
        </div>
      </SidebarHeader>

      <SidebarContent className="relative h-[200px] overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {isSidebarExpanded ? (
            <motion.div
              key="expanded"
              variants={slideInFromLeft} // Sử dụng animation từ trái sang phải
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transition}
              className="h-full w-full"
            >
              <ExpandedSidebarContent />
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              variants={slideInFromRight} // Sử dụng animation từ phải sang trái
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transition}
              className="h-full w-full"
            >
              <CollapsedSidebarContent />
            </motion.div>
          )}
        </AnimatePresence>
      </SidebarContent>

      <SidebarFooter>footer</SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
