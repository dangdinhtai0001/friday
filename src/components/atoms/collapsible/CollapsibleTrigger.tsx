import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { useCollapsibleContext } from "./context/CollapsibleContext";
import { cn } from "@/composables/utils/shadcn";
import { IconLoader } from "../icon-loader"; // Đảm bảo đường dẫn đúng
import { motion } from "motion/react";
import { CollapsibleTriggerProps } from "./types";

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
  const iconContent = customIcon ? (
    customIcon
  ) : showIcon ? (
    <IconLoader name={iconName} />
  ) : null; // Nếu không hiển thị icon, trả về null

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
      {...props}
    >
      {/* Sử dụng flex và justify-between để đẩy các phần tử ra hai bên.
        Thêm một div trống nếu iconPosition là "end" và không có icon "start" 
        để đảm bảo children luôn ở giữa hoặc sát bên trái nếu không có icon "start".
        Hoặc dùng flex-grow cho children để nó lấp đầy không gian.
      */}
      <div
        className={cn(
          "flex items-center gap-4",
          showIcon && children ? "justify-between" : "",
          className,
        )}
      >
        {/* Icon Start */}
        {iconPosition === "start" && animatedIcon}

        {/* Children - sử dụng flex-grow để nó lấp đầy không gian còn lại */}
        <div className="flex-grow">{children}</div>

        {/* Icon End */}
        {iconPosition === "end" && animatedIcon}
      </div>
    </CollapsiblePrimitive.CollapsibleTrigger>
  );
}

export default CollapsibleTrigger;
