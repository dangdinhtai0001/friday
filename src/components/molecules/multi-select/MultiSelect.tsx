import * as React from "react";
import {
  PopoverContent,
  PopoverTrigger,
  Popover,
} from "@/components/atoms/popover";
import { Button } from "@/components/atoms/button";
import useElementDimensions from "@/composables/hooks/useElementDimensions";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/molecules/command";
import translate from "@/composables/lib/international";
import { useSelect, UseSelectProps } from "@/composables/hooks/useSelect";
import { IconLoader } from "@/components/atoms/icon-loader";
import { Badge } from "@/components/atoms/badge";
import { Checkbox } from "@/components/atoms/checkbox";

export interface MultiSelectProps<TOption, TValue>
  extends UseSelectProps<TOption, TValue> {
  modalPopover?: boolean;
  getLabel?: (option: TOption) => string | React.ReactNode;
  getValue?: (option: TOption) => TValue;
  initialValue?: TValue[];
  placeholder?: string | React.ReactNode;
  maxCount?: number;
  onValueChange?: (value: (TOption | TValue)[]) => void;
  isDisabled?: (option: TOption) => boolean;
}

function MultiSelect<TOption, TValue>({
  modalPopover = false,
  initialOptions,
  getLabel,
  mode = "client",
  initialValue = [],
  getValue,
  placeholder = `${translate("component.multi-select.result-placeholder")}... `,
  maxCount = 2,
  onValueChange,
  isDisabled,
}: MultiSelectProps<TOption, TValue>) {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const { ref, width } = useElementDimensions();
  const { options } = useSelect<TOption, TValue>({ initialOptions, mode });
  const [selectedValues, setSelectedValues] =
    React.useState<(TValue | TOption)[]>(initialValue);

  const toggleOption = (option: TOption) => {
    const value = getValue ? getValue(option) : option;

    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((value) => value !== option)
      : [...selectedValues, option];

    setSelectedValues(newSelectedValues);
    onValueChange?.(newSelectedValues);
  };

  const isSelected = (option: TOption) => {
    const value = getValue ? getValue(option) : option;
    return selectedValues.includes(value);
  };

  const renderLabel = (option: TOption): string | React.ReactNode => {
    return getLabel ? getLabel(option) : String(option);
  };

  const handleClear = () => {
    setSelectedValues([]);
    onValueChange?.([]);
  };

  const isDisabledOption = React.useCallback(
    (option: TOption) => {
      return isDisabled ? isDisabled(option) : false;
    },
    [isDisabled],
  );

  const availableOptions = React.useMemo(
    () => options.filter((opt) => !isDisabledOption(opt)),
    [options, isDisabledOption],
  );

  const optionMap = React.useMemo(() => {
    const map = new Map<TValue | TOption, TOption>();
    availableOptions.forEach((opt) => {
      const key = getValue ? getValue(opt) : opt;
      map.set(key, opt);
    });
    return map;
  }, [availableOptions, getValue]);

  const isSelectedAll = () => {
    return selectedValues.length === availableOptions.length;
  };

  const findOption = React.useCallback(
    (value: TOption | TValue): TOption | undefined => {
      return optionMap.get(value);
    },
    [optionMap],
  );

  const toggleAll = () => {
    if (selectedValues.length === availableOptions.length) {
      handleClear();
    } else {
      const allValues = availableOptions.map((option) =>
        getValue ? getValue(option) : option,
      );
      setSelectedValues(allValues);
      onValueChange?.(allValues);
    }
  };

  const handleOpenChange = (open: boolean): void => {
    setIsPopoverOpen(open);
  };

  return (
    <Popover
      open={isPopoverOpen}
      onOpenChange={handleOpenChange}
      modal={modalPopover}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          ref={ref as React.Ref<HTMLButtonElement>}
          className="flex h-auto min-h-10 w-full items-center justify-between"
        >
          {selectedValues.length > 0 ? (
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-wrap items-center gap-2">
                {selectedValues
                  .slice(0, maxCount)
                  .map((value: TOption | TValue, index: number) => {
                    const option = findOption(value);
                    return (
                      <Badge
                        key={index}
                        className="flex transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                      >
                        {option ? (
                          renderLabel(option)
                        ) : (
                          <div>{value as string}</div>
                        )}
                        <div
                          className="border-black-20 flex items-center justify-center rounded-full border transition-transform duration-300 hover:rotate-360"
                          onClick={(event) => {
                            if (option) {
                              event.preventDefault();
                              toggleOption(option as TOption);
                            }
                          }}
                        >
                          <IconLoader name="x" className="size-12" />
                        </div>
                      </Badge>
                    );
                  })}
                {selectedValues.length > maxCount && (
                  <Badge className="border-black-5 border bg-transparent">
                    <div className="typography-regular-12 text-black-80">
                      {`...+${selectedValues.length - maxCount}`}
                    </div>
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div
                  className="border-black-20 flex cursor-pointer items-center justify-center rounded-full border transition-transform duration-500 hover:rotate-360"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleClear();
                  }}
                >
                  <IconLoader name="x" />
                </div>
              </div>
            </div>
          ) : (
            <div className="typography-regular-14 text-black-20">
              {placeholder}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="rounded-4 p-0"
        align="start"
        style={{ width: width }}
      >
        <Command>
          <CommandInput
            placeholder={`${translate("component.multi-select.search-placeholder")}...`}
          />
          <CommandList>
            <CommandEmpty>
              {translate("component.multi-select.no-results")}
            </CommandEmpty>
            <CommandGroup>
              <CommandItem
                key="all"
                onSelect={toggleAll}
                className="cursor-pointer"
              >
                <Checkbox
                  id="all-checked"
                  animation={false}
                  checked={isSelectedAll()}
                  disabled={false}
                />
                <div className="typography-regular-12">
                  {translate("component.multi-select.select-all")}
                </div>
              </CommandItem>
              <div className="option-viewport relative h-[200px] w-full overflow-auto">
                {options.map((option: TOption, index: number) => {
                  const isDisabled = isDisabledOption(option);
                  return (
                    <CommandItem
                      key={index}
                      onSelect={() => toggleOption(option)}
                      className={`${isDisabled ? "cursor-not-allowed line-through opacity-50" : "cursor-pointer"} ${isSelected(option) ? "bg-black-5" : ""}`}
                      disabled={isDisabled}
                    >
                      <Checkbox
                        id={index.toString()}
                        animation={false}
                        checked={isSelected(option)}
                        disabled={isDisabled}
                      />
                      <div
                        className={`typography-regular-12 ${isDisabled ? "text-black-20" : ""}`}
                      >
                        {renderLabel(option)}
                      </div>
                    </CommandItem>
                  );
                })}
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default MultiSelect;
