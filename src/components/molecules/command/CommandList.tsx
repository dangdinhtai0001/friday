import { cn } from "@/composables/lib/utils";
import { Command as CommandPrimitive } from "cmdk";

function CommandList({
    className,
    ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
    return (
        <CommandPrimitive.List
            data-slot="command-list"
            className={cn(
                "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
                className
            )}
            {...props}
        />
    )
}

export default CommandList; 