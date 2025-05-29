import { cn } from "@/composables/utils/shadcn";
import { GridItemProps } from "./types";

function GridItem({ x, y, width = 1, height = 1, children, className }: GridItemProps) {
  const style: React.CSSProperties = {};
  style["--grid-item-x"] = x;
  style["--grid-item-y"] = y;
  style["--grid-item-width"] = width;
  style["--grid-item-height"] = height;

  return (
    <div
      className={cn(
        "h-full w-full",
        "col-start-[var(--grid-item-x)] row-start-[var(--grid-item-y)]",
        "col-span-[var(--grid-item-width)] row-span-[var(--grid-item-height)]",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}

export default GridItem;
