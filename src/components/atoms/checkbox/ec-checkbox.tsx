import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from '@/composables/utils/shadcn';
import { ECIconLoader } from '../icon-loader';
import { AnimatePresence, motion } from 'motion/react';
import { iconTransition, iconVariants } from './variants';

export type CheckBoxProps = React.ComponentProps<
  typeof CheckboxPrimitive.Root
> & {};

function Checkbox({
  className,
  checked: controlledChecked,
  onCheckedChange,
  ...props
}: CheckBoxProps) {
  const [uncontrolledChecked, setUncontrolledChecked] =
    React.useState<CheckboxPrimitive.CheckedState>(false);

  const isControlled = controlledChecked !== undefined;
  const currentChecked = isControlled ? controlledChecked : uncontrolledChecked;

  const handleCheckedChange = (state: CheckboxPrimitive.CheckedState) => {
    if (isControlled && onCheckedChange) {
      onCheckedChange(state);
    } else if (!isControlled) {
      setUncontrolledChecked(state);
    }
  };

  // Logic để xác định icon nào hiển thị:
  // 1. Ưu tiên trạng thái indeterminate
  // 2. Sau đó đến trạng thái checked (true/false)

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'rounded-8 border-black-10 size-28 border outline-none',
        'data-[state=checked]:bg-primary-brand data-[state=checked]:text-white-100 data-[state=checked]:border-primary-brand',
        'transition-colors duration-300',
        'focus-visible:ring-none focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        "data-[state=checked]:disabled:bg-black-10 data-[state=checked]:disabled:border-transparent",
        className,
      )}
      checked={currentChecked}
      onCheckedChange={handleCheckedChange}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex h-fit items-center justify-center"
        forceMount
      >
        <AnimatePresence initial={false}>
          {(currentChecked === true) && (
            <motion.div
              key="check"
              variants={iconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={iconTransition}
              className="flex items-center justify-center"
            >
              <ECIconLoader name="check" className="size-16" />
            </motion.div>
          )}
          {(currentChecked === 'indeterminate') && (
            <motion.div
              key="check"
              variants={iconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={iconTransition}
              className="flex items-center justify-center"
            >
              <ECIconLoader name="minus" className="size-16" />
            </motion.div>
          )}
        </AnimatePresence>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export default Checkbox;
