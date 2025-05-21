// src\components\atoms\collapsible\CollapsibleContent.tsx

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { useCollapsibleContext } from "./context/CollapsibleContext";
import { AnimatePresence, motion } from "motion/react";
import { CSSProperties } from "react";
import { cn } from "@/composables/utils/shadcn";

function CollapsibleContent({
  children,
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  const {
    state: { isOpen },
  } = useCollapsibleContext();

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }} // Trạng thái ban đầu (khi mount)
          animate={{ opacity: 1, height: "auto" }} // Trạng thái khi animate (sau khi mount)
          exit={{ opacity: 0, height: 0 }} // Trạng thái khi unmount (trước khi biến mất)
          transition={{ duration: 0.3, ease: "easeInOut" }} // Cấu hình animation
          style={{ overflow: "hidden" } as CSSProperties} // Rất quan trọng để tránh tràn nội dung khi height thay đổi
          className={cn("w-full", className)}
        >
          <CollapsiblePrimitive.CollapsibleContent {...props} forceMount>
            {children}
          </CollapsiblePrimitive.CollapsibleContent>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CollapsibleContent;