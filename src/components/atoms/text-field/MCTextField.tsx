import { MCInput, type MCInputProps } from "@/components/atoms/input";
import { cn } from "@/composables/utils/shadcn";
import { textFieldVariants, addonVariant } from "./variant";
import React from "react";
import { IconLoader } from "@/components/atoms/icon-loader";
import { AnimatePresence, motion } from "motion/react";

type AddonPosition = "before" | "after";

export type MCTextFieldProps = Omit<MCInputProps, "prefix"> & {
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  prefix?: React.ReactNode | string;
  postfix?: React.ReactNode | string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onClear?: () => void;
};

function MCTextField({
  addonBefore,
  addonAfter,
  prefix,
  postfix,
  size,
  className,
  value: controlledValue,
  defaultValue,
  disabled,
  onChange,
  onClear,
  ...props
}: MCTextFieldProps) {
  const renderAddon = (
    addon: React.ReactNode | undefined,
    postion: AddonPosition,
  ) => {
    if (addon) {
      return (
        <div
          className={cn(
            "addon",
            addonVariant(size),
            postion == "before" ? "border-r-none rounded-r-none" : "",
            postion == "after" ? "border-l-none rounded-l-none" : "",
          )}
        >
          {addon}
        </div>
      );
    }

    return null;
  };

  const renderAffix = (affix: React.ReactNode | undefined) => {
    if (affix) {
      return (
        <div className={cn("affix", "group-hover:border-black-40")}>
          {affix}
        </div>
      );
    }

    return null;
  };

  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue); // Cập nhật giá trị nội bộ (uncontrolled)
    }
    if (onChange) {
      onChange(newValue); // Gọi onChange từ cha (controlled)
    }
  };

  const handleClear = () => {
    if (isControlled && onClear) {
      onClear(); // Gọi onClear từ cha (controlled)
    } else {
      setInternalValue(""); // Xóa giá trị nội bộ (uncontrolled)
    }
  };

  const hasValue = React.useMemo(() => {
    return isControlled ? !!controlledValue : !!internalValue;
  }, [controlledValue, internalValue, isControlled]);

  return (
    <div
      className={cn(
        "group group flex items-center",
        disabled
          ? "disabled:pointer-events-none disabled:cursor-not-allowed"
          : "",
        className,
      )}
    >
      {renderAddon(addonBefore, "before")}
      {/* Input wrapper */}
      <div
        className={cn(
          "input-wrapper group-hover:border-black-40 flex w-full items-center gap-4",
          textFieldVariants(size),
          addonBefore ? "rounded-l-none border-l-0" : "",
          addonAfter ? "rounded-r-none border-r-0" : "",
          disabled
            ? "bg-black-4 text-black-20 pointer-events-none cursor-not-allowed opacity-50"
            : "",
        )}
      >
        {renderAffix(prefix)}
        <MCInput
          className={cn(
            "w-full rounded-none border-r-0 border-l-0 focus-visible:ring-0",
            disabled ? "" : "group-hover:border-black-40",
          )}
          size={size}
          disabled={disabled}
          defaultValue={defaultValue}
          value={isControlled ? controlledValue : internalValue}
          onChange={handleChange}
          {...props}
        />
        <AnimatePresence>
          {hasValue && (
            <motion.button
              onClick={handleClear}
              className="hover:bg-black-10 cursor-pointer rounded-full p-0"
              key="clear-button"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.15, ease: "easeInOut", type: "spring" }}
            >
              <IconLoader name="x" />
            </motion.button>
          )}
        </AnimatePresence>
        {renderAffix(postfix)}
      </div>
      {/* Input wrapper */}
      {renderAddon(addonAfter, "after")}
    </div>
  );
}

export default MCTextField;
