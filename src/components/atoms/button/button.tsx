import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/composables/lib/utils";
import { ButtonProps } from "./types";
import buttonVariants from "./variant";

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export default Button ;
