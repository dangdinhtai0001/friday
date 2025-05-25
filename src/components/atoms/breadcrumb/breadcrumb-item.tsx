import * as React from "react"
import { cn } from "@/composables/utils/shadcn"

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center typography-regular-14", className)}
      {...props}
    />
  )
}

export default BreadcrumbItem;
