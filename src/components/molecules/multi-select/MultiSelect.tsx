import * as React from "react";
import { PopoverContent, PopoverTrigger, Popover } from "@/components/atoms/popover";
import { Button } from "@/components/atoms/button";
import useElementDimensions from "@/composables/hooks/useElementDimensions";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/molecules/command";
import translate from "@/composables/hooks/international";
import { useSelect, UseSelectProps } from "@/composables/hooks/useSelect";
import { SelectItem } from ".";
import { IconLoader } from "@/components/atoms/icon-loader";
import { Badge } from "@/components/atoms/badge";

export interface MultiSelectProps<TOption, TValue> extends UseSelectProps<TOption, TValue> {
    modalPopover?: boolean,
    getLabel?: (option: TOption) => string;
    getValue?: (option: TOption) => TValue;
    initialValue?: TValue[];
    placeholder?: string | React.ReactNode;
}

function MultiSelect<TOption, TValue>({ modalPopover = false, initialOptions, getLabel, mode = "client", initialValue = [], getValue, placeholder }: MultiSelectProps<TOption, TValue>) {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const { ref, width } = useElementDimensions();
    const { options } = useSelect<TOption, TValue>({ initialOptions, mode })
    const [selectedValues, setSelectedValues] = React.useState<(TValue | TOption)[]>(initialValue);

    const toggleAll = () => { }

    const toggleOption = (option: TOption) => {
        const value = getValue ? getValue(option) : option;

        const newSelectedValues = selectedValues.includes(value)
            ? selectedValues.filter((value) => value !== option)
            : [...selectedValues, option];

        setSelectedValues(newSelectedValues);
    };

    const isSelected = (option: TOption) => {
        const value = getValue ? getValue(option) : option;
        return selectedValues.includes(value);
    }

    const renderLabel = (option: TOption): string => {
        return getLabel ? getLabel(option) : "";
    }

    const handleClear = () => {
        setSelectedValues([]);
    };

    return (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={modalPopover}>
            <PopoverTrigger asChild>
                <Button ref={ref as React.Ref<HTMLButtonElement>} className="flex items-center justify-between w-full min-h-10 h-auto p-1">
                    {selectedValues.length > 0 ? (
                        <div className="flex justify-between items-center w-full">
                            <div className="flex flex-wrap items-center">
                            {selectedValues.slice(0, maxCount).map((value: TOption| TValue, index: number) => {
                                return (
                                    <Badge key={index}>{renderLabel(value)}</Badge>
                                )
                            })}
                            </div>
                            <div className="flex items-center justify-between">
                                <div onClick={(event) => {
                                    event.stopPropagation();
                                    handleClear();
                                }}
                                >
                                    <IconLoader name="x" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>{placeholder}</div>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 rounded-4" align="start" style={{ width: width }}>
                <Command>
                    <CommandInput placeholder={`${translate("component.multi-select.placeholder")}...`} />
                    <CommandList>
                        <CommandEmpty>{translate("component.multi-select.no-results")}</CommandEmpty>
                        <CommandGroup>
                            <CommandItem key="all" onSelect={toggleAll} className="cursor-pointer">
                                <SelectItem label={translate("component.multi-select.select-all")} id="all-checked" checked={false} />
                            </CommandItem>
                            {options.map((option: TOption, index: number) => {
                                return (
                                    <CommandItem key={index} onSelect={() => toggleOption(option)} className="cursor-pointer hover:bg-black-20">
                                        <SelectItem label={renderLabel(option)} id={index.toString()} checked={isSelected(option)} />
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default MultiSelect;

