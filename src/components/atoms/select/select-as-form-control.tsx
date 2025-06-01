import { Select } from './select-root';
import * as SelectPrimitive from '@radix-ui/react-select';

export type SelectAsFormControlProps = React.ComponentProps<
  typeof SelectPrimitive.Root
> & {
  onChange?: (...event: unknown[]) => void;
};

function SelectAsFormControl({ onChange, ...props }: SelectAsFormControlProps) {
  return <Select {...props} onValueChange={onChange} />;
}

export default SelectAsFormControl;
