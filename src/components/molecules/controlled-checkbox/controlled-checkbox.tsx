import { ECCheckbox, ECCheckboxProps } from '@/components/atoms/checkbox';
import { ControlledProps } from '@/components/shared-types';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

export type ControlledCheckboxProps = ControlledProps &
  ECCheckboxProps & {
    value?: CheckboxPrimitive.CheckedState;
  };

function ControlledCheckbox({
  value,
  onChange,
  ...props
}: ControlledCheckboxProps) {
  const handleChange = (newValue: CheckboxPrimitive.CheckedState) => {
    if (onChange) {
      onChange(newValue);
    }
  };
  return (
      <ECCheckbox checked={value} onCheckedChange={handleChange} {...props} />
  );
}

export default ControlledCheckbox;
