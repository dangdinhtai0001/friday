import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/composables/utils/shadcn"

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("text-black-40 hover:text-black-100 transition-colors", className)}
      {...props}
    />
  )
}

export default BreadcrumbLink;