import * as React from "react";
import { cn } from "@/composables/utils/shadcn";
import { ECIconLoader } from "../icon-loader";

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      {children ?? <ECIconLoader name="slash" className="text-black-40" />}
    </li>
  );
}

export default BreadcrumbSeparator;
