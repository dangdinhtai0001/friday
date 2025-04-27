import { cn } from "@/composables/lib/utils";

function EdgePanelFooter({ className, ...props }: React.ComponentProps<"div">) {
    return (
      <div
        data-slot="sheet-footer"
        className={cn("mt-auto flex flex-col gap-2 p-4", className)}
        {...props}
      />
    );
}

export { EdgePanelFooter };
