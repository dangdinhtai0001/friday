import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { useCollapsibleContext } from "./context/CollapsibleContext";
import { cn } from "@/composables/utils/shadcn";
import { IconLoader } from "../icon-loader"; // Đảm bảo đường dẫn đúng
import { motion } from "motion/react";

// Định nghĩa kiểu cho props của CollapsibleTrigger
type CollapsibleTriggerProps = React.ComponentProps<
  typeof CollapsiblePrimitive.CollapsibleTrigger
> & {
  /**
   * Quyết định có hiển thị icon hay không. Mặc định là true.
   */
  showIcon?: boolean;
  /**
   * Vị trí của icon: "start" (đầu) hoặc "end" (cuối). Mặc định là "end".
   */
  iconPosition?: "start" | "end";
  /**
   * Tên của icon khi sử dụng IconLoader. Mặc định là "chevron-right".
   */
  iconName?: string;
  /**
   * Component hoặc ReactNode tùy chỉnh để sử dụng làm icon, sẽ ưu tiên hơn iconName.
   */
  customIcon?: React.ReactNode;
  /**
   * Kích hoạt animation xoay cho icon khi trạng thái Collapsible thay đổi. Mặc định là true.
   */
  enableIconAnimation?: boolean; // Đổi tên biến để rõ ràng hơn
};

// Định nghĩa các biến thể và chuyển đổi cho animation của icon
const ICON_ROTATION_VARIANTS = {
  open: { rotate: 90 },
  closed: { rotate: 0 },
};

const ICON_ANIMATION_TRANSITION = {
  duration: 0.1,
  type: "spring",
  stiffness: 200,
  damping: 20,
};

function CollapsibleTrigger({
  children,
  className,
  showIcon = true,
  iconPosition = "end",
  iconName = "chevron-right",
  customIcon,
  enableIconAnimation = true, 
  ...props
}: CollapsibleTriggerProps) {
  const {
    state, // state chứa isOpen để kiểm tra trạng thái
    actions: { toggle },
  } = useCollapsibleContext();

  // Xác định icon sẽ được hiển thị: ưu tiên customIcon, sau đó đến IconLoader
  const iconContent = customIcon
    ? customIcon
    : showIcon
    ? <IconLoader name={iconName} />
    : null; // Nếu không hiển thị icon, trả về null

  // Bọc icon trong motion.div nếu animation được bật và iconContent tồn tại
  const animatedIcon =
    enableIconAnimation && iconContent ? (
      <motion.div
        variants={ICON_ROTATION_VARIANTS}
        animate={state.isOpen ? "open" : "closed"}
        transition={ICON_ANIMATION_TRANSITION}
      >
        {iconContent}
      </motion.div>
    ) : (
      iconContent // Không có animation, chỉ hiển thị icon gốc
    );

  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      onClick={toggle}
      className={cn("flex items-center gap-4", className)}
      {...props}
    >
      {/* Hiển thị icon ở vị trí "start" nếu được yêu cầu */}
      {iconPosition === "start" && animatedIcon}

      {children}

      {/* Hiển thị icon ở vị trí "end" nếu được yêu cầu */}
      {iconPosition === "end" && animatedIcon}
    </CollapsiblePrimitive.CollapsibleTrigger>
  );
}

export default CollapsibleTrigger;