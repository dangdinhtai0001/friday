import { cn } from "@/composables/lib/utils";
import * as SheetPrimitive from "@radix-ui/react-dialog";

function EdgePanelTitle({
    className,
    ...props
  }: React.ComponentProps<typeof SheetPrimitive.Title>) {
    return (
      <SheetPrimitive.Title
        data-slot="sheet-title"
        className={cn("text-foreground typography-regular-24", className)}
        {...props}
      />
    );
}

export { EdgePanelTitle };
