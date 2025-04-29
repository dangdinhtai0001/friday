import { cn } from "@/composables/lib/utils";
import { ChevronUpIcon } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";

function SelectScrollUpButton({
    className,
    ...props
  }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
    return (
      <SelectPrimitive.ScrollUpButton
        data-slot="select-scroll-up-button"
        className={cn(
          "flex cursor-default items-center justify-center py-1",
          className
        )}
        {...props}
      >
        <ChevronUpIcon className="size-4" />
      </SelectPrimitive.ScrollUpButton>
    )
  }

export default SelectScrollUpButton;        