import * as React from "react";
import { cn } from "@/composables/lib/utils";

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left border-b border-border-1 pb-2 border-black-20",
      className
    )}
    {...props}
  />
);

DialogHeader.displayName = "DialogHeader";
export { DialogHeader };