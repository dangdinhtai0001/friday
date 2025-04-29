import { cn } from "@/composables/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
function SelectSeparator({
    className,
    ...props
  }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
    return (
      <SelectPrimitive.Separator
        data-slot="select-separator"
        className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
        {...props}
      />
    )
  }

export default SelectSeparator; 