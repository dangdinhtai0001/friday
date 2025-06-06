import {
  ECSelect,
  ECSelectContent,
  ECSelectItem,
  ECSelectTrigger,
  ECSelectValue,
} from '@/components/atoms/select';
import { cn } from '@/composables/utils/shadcn';
import React from 'react';
import { BaseOption, ControlledSelectProps } from './types';
import { useLanguage } from '@/composables/hooks/use-language';
import animationData from '@/assets/lotties/empty-state-animation.json';
import { ECLottieLoader } from '@/components/atoms/lottie-loader';


function ControlledSelect<TOption extends BaseOption>({
  options: optionsProp,
  renderLabel: renderLabelProp,
  getOptionValue: getOptionValueProp,
  placeholder,
  onChange,
  className,
  ...props
}: ControlledSelectProps<TOption>) {
  const { t } = useLanguage();

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
    <ECSelect onValueChange={handleValueChange} {...props}>
      <ECSelectTrigger className={cn('text-black-100 w-full', className)}>
        <ECSelectValue placeholder={placeholder} />
      </ECSelectTrigger>

      <ECSelectContent className="text-black-100">
        {isLoading && <div>{t('component/select:loading_options')}</div>}
        {fetchError && (
          <div className="text-secondary-red">
            {t('component/select:error_fetching_data')}
            {fetchError}
          </div>
        )}
        {!isLoading && !fetchError && internalOptions.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <ECLottieLoader
              options={{ animationData: animationData }}
              height={150}
              width={150}
            />
            <span className="typography-regular-14 text-black-100">
              {t('component/select:no_options_available')}
            </span>
          </div>
        ) : (
          internalOptions.map((option) => (
            <ECSelectItem key={option.value} value={String(option.value)}>
              {renderLabel(option)}
            </ECSelectItem>
          ))
        )}
      </ECSelectContent>
    </ECSelect>
  );
}

export default ControlledSelect;
