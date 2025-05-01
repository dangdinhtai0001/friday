import { cn } from "@/composables/lib/utils";
import { Command as CommandPrimitive } from "cmdk"
import { IconLoader } from "@/components/atoms/icon-loader";

function CommandInput({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>) {
    return (
        <div data-slot="command-input-wrapper" className="flex h-9 items-center gap-2 border-b border-b-black-10 px-4 py-2 round-2">
            <IconLoader name="search" className="opacity-50 w-16 h-16" />
            <CommandPrimitive.Input
                data-slot="command-input"
                className={cn(
                    "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                {...props}
            />
        </div>
    )
}

export default CommandInput;