import { Slot } from "@radix-ui/react-slot"
import { variants } from "./variant"
import { VariantProps } from "class-variance-authority"
import { cn } from "@/composables/lib/utils"

function Badge({ className, variant, asChild = false, ...props }: React.ComponentProps<"span"> &
    VariantProps<typeof variants> & { asChild?: boolean }) {
    const Comp = asChild ? Slot : "span"

    return (
        <Comp
            data-slot="badge"
            className={cn(variants({ variant }), className)}
            {...props}
        />
    )
}

export default Badge;
