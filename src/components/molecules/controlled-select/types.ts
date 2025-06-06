import { ECSelectProps } from "@/components/atoms/select";
import { ControlledProps } from "@/components/shared-types";

export type BaseOption = {
  value: string | number;
  label?: string;
};

export type SelectOption<TOption extends BaseOption> =
  | TOption[]
  | (() => Promise<TOption[]>)
  | (() => TOption[]);

export type ControlledSelectProps<TOption extends BaseOption> = ControlledProps &
  ECSelectProps & {
    options?: SelectOption<TOption>;
    getOptionValue?: (option: TOption) => unknown;
    renderLabel?: (option: TOption) => React.ReactNode;
    placeholder?: React.ReactNode;
    className?: string;
  };