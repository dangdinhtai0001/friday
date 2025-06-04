import {
  MCSelect,
  MCSelectContent,
  MCSelectItem,
  MCSelectProps,
  MCSelectTrigger,
  MCSelectValue,
} from '@/components/atoms/select';
import { cn } from '@/composables/utils/shadcn';
import React from 'react';

export type FormField = {
  onChange?: (value: unknown) => void;
  onBlur?: () => void;
  value?: unknown;
  disabled?: boolean;
  name?: boolean;
  ref?: React.Ref<unknown>;
};

export type BaseOption = {
  value: string | number;
  label?: string;
};

export type SelectOption<TOption extends BaseOption> =
  | TOption[]
  | (() => Promise<TOption[]>)
  | (() => TOption[]);

export type ControlledSelectProps<TOption extends BaseOption> = FormField &
  MCSelectProps & {
    options?: SelectOption<TOption>;
    getOptionValue?: (option: TOption) => unknown;
    renderLabel?: (option: TOption) => React.ReactNode;
    placeholder?: React.ReactNode;
    className?: string;
  };

function ControlledSelect<TOption extends BaseOption>({
  options: optionsProp,
  renderLabel: renderLabelProp,
  getOptionValue: getOptionValueProp,
  placeholder,
  onChange,
  className,
  ...props
}: ControlledSelectProps<TOption>) {
  const [internalOptions, setInternalOptions] = React.useState<TOption[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [fetchError, setFetchError] = React.useState<string | null>(null);

  const loadOptions = React.useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      let fetched: TOption[];
      if (Array.isArray(optionsProp)) {
        fetched = optionsProp;
      } else if (typeof optionsProp === 'function') {
        const result = optionsProp();
        if (result instanceof Promise) {
          fetched = await result;
        } else {
          fetched = result;
        }
      } else {
        fetched = [];
      }
      setInternalOptions(fetched);
    } catch (err) {
      console.error('Failed to load options:', err);
      setFetchError('Không thể tải dữ liệu. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  }, [optionsProp]);

  React.useEffect(() => {
    loadOptions();
  }, [loadOptions]);

  const renderLabel = React.useCallback(
    (option: TOption): React.ReactNode => {
      if (renderLabelProp) {
        return renderLabelProp(option);
      }
      // Mặc định hiển thị option.label hoặc option.id
      return option.label || String(option.value);
    },
    [renderLabelProp],
  );

  const getOptionValue = React.useCallback(
    (option: TOption): unknown => {
      if (getOptionValueProp) {
        return getOptionValueProp(option);
      }
      return option.value as unknown;
    },
    [getOptionValueProp],
  );

  const handleValueChange = (newValue: string) => {
    // Tìm option tương ứng với radixValue
    const changedOption = internalOptions.find(
      (opt) => String(getOptionValue(opt)) === newValue,
    );
    if (changedOption) {
      onChange?.(getOptionValue(changedOption));
    } else {
      onChange?.(undefined);
    }
  };

  return (
    <MCSelect onValueChange={handleValueChange} {...props}>
      <MCSelectTrigger className={cn('text-black-100 w-full', className)}>
        <MCSelectValue placeholder={placeholder} />
      </MCSelectTrigger>

      <MCSelectContent className='text-black-100'>
        {isLoading && <div>Đang tải...</div>}
        {fetchError && <div className="text-secondary-red">Lỗi: {fetchError}</div>}
        {!isLoading && !fetchError && internalOptions.length === 0 ? (
          <div>Không có tùy chọn nào</div>
        ) : (
          internalOptions.map((option) => (
            <MCSelectItem key={option.value} value={String(option.value)}>
              {renderLabel(option)}
            </MCSelectItem>
          ))
        )}
      </MCSelectContent>
    </MCSelect>
  );
}

export default ControlledSelect;
