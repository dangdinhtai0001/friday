import { cn } from "@/composables/lib/utils";
import * as SheetPrimitive from "@radix-ui/react-dialog";

function EdgePanelDescription({
    className,
    ...props
  }: React.ComponentProps<typeof SheetPrimitive.Description>) {
    return (
      <SheetPrimitive.Description
        data-slot="sheet-description"
        className={cn("text-muted-foreground text-sm", className)}
        {...props}
      />
    );
}

export { EdgePanelDescription };
