import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/organisms/sidebar2";
import CollapsedSidebarContent from "./collapsed-sidebar-content";
import ExpandedSidebarContent from "./expanded-sidebar-content";
import { motion, AnimatePresence } from "motion/react";
import {
  MCAvatar,
  MCAvatarFallback,
  MCAvatarImage,
} from "@/components/atoms/avatar";
import { MCSkeleton } from "@/components/atoms/skeleton";
import logo from "@/assets/images/vite.svg";
import { Link } from "react-router";
import { useAppLayoutContext } from "../context/app-layout-context";

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
function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {
    state: { isSidebarExpanded, headerHeight },
  } = useAppLayoutContext();

  return (
    <Sidebar {...props} className="bg-background-2">
      <Link to="/">
        <SidebarHeader
          className="typography-regular-24 rounded-8 flex w-full cursor-pointer items-center justify-start gap-12 px-8"
          style={{ height: headerHeight }}
        >
          <MCAvatar className="size-32">
            <MCAvatarImage src={logo} />
            <MCAvatarFallback>
              <MCSkeleton className="size-32 rounded-full" />
            </MCAvatarFallback>
          </MCAvatar>
          {isSidebarExpanded && (
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              Friday
            </span>
          )}
        </SidebarHeader>
      </Link>

      <SidebarContent className="relative overflow-x-hidden">
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

      <SidebarFooter className="flex items-center justify-center">
        {/* <span className="typography-regular-12 text-black-100">0.0.0</span> */}
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
