import * as React from "react"
import { cn } from "@/composables/utils/shadcn"

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center",
        className
      )}
      {...props}
    />
  )
}

export default BreadcrumbList;