import { cn } from "@/composables/utils/shadcn";

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
    return (
      <div
        data-slot="card-description"
        className={cn("text-black-40 typography-regular-12", className)}
        {...props}
      />
    )
  }

  export default CardDescription