import { type MCInputProps, MCInput } from '@/components/atoms/input';
import { cn } from '@/composables/utils/shadcn';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';
import { IconLoader } from '../icon-loader';

type AddonPosition = 'before' | 'after';

export type TextFieldProps = Omit<MCInputProps, 'prefix'> & {
  defaultValue?: string;
  disabled?: boolean;
  formatter?: (value: string) => string;
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  prefix?: React.ReactNode | string;
  postfix?: React.ReactNode | string;
};

function TextField({
  defaultValue,
  value: controlledValue,
  onChange,
  disabled,
  size,
  prefix,
  postfix,
  className,
  onClear,
  addonBefore,
  addonAfter,
  ...props
}: TextFieldProps) {
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

  const hasValue = React.useMemo(() => {
    return isControlled ? !!controlledValue : !!internalValue;
  }, [controlledValue, internalValue, isControlled]);

  const renderAffix = (affix: React.ReactNode | undefined) => {
    if (affix) {
      return (
        <div className={cn('affix')}>
          {affix}
        </div>
      );
    }

    return null;
  };

  const renderAddon = (
    addon: React.ReactNode | undefined,
    postion: AddonPosition,
  ) => {
    if (addon) {
      return (
        <div
          className={cn(
            'addon typography-regular-14 border-black-10 pr-4',
            postion == 'before' ? 'border-r-[0.5px] pr-4' : '',
            postion == 'after' ? 'border-l-[0.5px] pl-4' : '',
          )}
        >
          {addon}
        </div>
      );
    }

    return null;
  };

  const handleClear = () => {
    if (isControlled && onClear) {
      onClear();
    } else {
      setInternalValue('');
      if (onChange) {
        onChange('');
      }
    }
  };

  const renderClearIcon = () => {
    return (
      <AnimatePresence>
        {hasValue && (
          <motion.button
            onClick={handleClear}
            className="hover:bg-black-10 cursor-pointer rounded-full p-0"
            key="clear-button"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.15, ease: 'easeInOut', type: 'spring' }}
            whileHover={{
              rotate: 90,
              transition: {
                duration: 0.3,
                type: 'spring',
                stiffness: 260,
                damping: 20,
              },
            }}
          >
            <IconLoader name="x" />
          </motion.button>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div
      className={cn(
        'input-wrapper group flex w-full items-center gap-4',
        'border-black-10 rounded-8 typography-regular-14 border-[0.5px] px-8',
        disabled
          ? 'bg-black-4 text-black-20 hover:cursor-not-allowed opacity-50'
          : 'hover:border-black-40',
        className,
      )}
    >
      {renderAddon(addonBefore, 'before')}
      {renderAffix(prefix)}
      <MCInput
        className={cn(
          'w-full rounded-none border-0 px-0 focus-visible:ring-0',
          disabled ? '' : 'group-hover:border-black-40',
        )}
        size={size}
        disabled={disabled}
        defaultValue={defaultValue}
        value={isControlled ? controlledValue : internalValue}
        onChange={handleChange}
        {...props}
      />
      {renderClearIcon()}
      {renderAffix(postfix)}
      {renderAddon(addonAfter, 'after')}
    </div>
  );
}

export default TextField;
