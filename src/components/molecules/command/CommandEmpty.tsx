import { Command as CommandPrimitive } from "cmdk";

function CommandEmpty({
    ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
    return (
        <CommandPrimitive.Empty
            data-slot="command-empty"
            className="py-6 text-center typography-regular-12 text-black-20"
            {...props}
        />
    )
}

export default CommandEmpty;