import { cn } from "@/composables/utils/shadcn";
import { Button } from ".";
import { ButtonProps } from "./Button";
import { IconLoader } from "@/components/atoms/icon-loader";
import { LoadingCircleSpinner } from "@/components/atoms/spinner";
import { motion } from "motion/react";

export type IconButtonProps = ButtonProps & {
  leftIcon?: string | React.ReactNode;
  rightIcon?: string | React.ReactNode;
  isLoading?: boolean;
};

const MotionButton = motion.create(Button, { forwardMotionProps: true });


function getIconSize(size: IconButtonProps["size"]): string {
  if (size === "large") return "size-24";
  if (size === "medium") return "size-20";
  if (size === "small") return "size-16";

  return "";
}

function IconButton({
  className,
  leftIcon,
  rightIcon,
  isLoading = false,
  children,
  disabled,
  size,
  ...props
}: IconButtonProps) {
  const renderIcon = (icon: string | React.ReactNode): React.ReactNode => {
    if (typeof icon === "string") {
      return <IconLoader name={icon} className={cn(getIconSize(size))} />;
    }

    return icon;
  };

  return (
    <MotionButton
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={cn("flex items-center", className)}
      disabled={disabled || isLoading}
      size={size}
      onPointerEnter={() => {}}
      {...props}
    >
      {isLoading ? (
        <LoadingCircleSpinner className={cn(getIconSize(size))} />
      ) : (
        renderIcon(leftIcon)
      )}
      {children}
      {renderIcon(rightIcon)}
    </MotionButton>
  );
}

export default IconButton;
