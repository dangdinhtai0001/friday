import { Checkbox, CheckboxProps } from "@/components/atoms/checkbox";
import { Label } from "@/components/atoms/label";
import { cn } from "@/composables/lib/utils";

export interface CheckLabelProps extends CheckboxProps {
  id: string;
  label: string | React.ReactNode;
  className?: string;
}

function CheckLabel({ id, label, className, ...props }: CheckLabelProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} {...props} />
      <Label htmlFor={id} className={cn("", className)}>
        {label}
      </Label>
    </div>
  );
}

export default CheckLabel;
