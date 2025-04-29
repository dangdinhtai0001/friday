import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cn } from "@/composables/lib/utils"
import { IconLoader } from "../icon-loader"

interface CheckboxProps extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  animation?: boolean;
}

function Checkbox({ className, animation = true, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        "w-16 h-16 border border-black-20 rounded-4",
        "hover:cursor-pointer [not[hover][disabled]]:ring hover:ring-black-20",
        "data-[state=checked]:bg-primary-brand data-[state=checked]:text-white-100",
        "disabled:bg-black-10 disabled:border-black-20 disabled:cursor-not-allowed",
        "[&[disabled][data-state=checked]]:bg-black-10 [&[disabled][data-state=checked]]:border-black-20 [&[disabled][data-state=checked]]:text-black-40 [&[disabled][data-state=checked]]:cursor-not-allowed",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator asChild data-slot="checkbox-indicator"
        className={cn(
          "flex items-center justify-center transition-none w-full h-full",
          "data-[state=checked]:text-white-100",
          "disabled:text-black-40",
          "[&[disabled][data-state=checked]]:text-black-40",
        )}
      >
        <IconLoader name={animation ? "check-animation" : "check"} className="fill-white-100" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export default Checkbox;
