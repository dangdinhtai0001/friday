import { cn } from "@/composables/utils/shadcn";

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("typography-semibold-14 text-black-100 leading-none", className)}
      {...props}
    />
  );
}

export default CardTitle;
