import React from "react";
import { Table, Cell, flexRender } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { DEFAULT_COLUMN_MIN_WIDTH } from "../../core/constants";

export interface ContentContainerProps<TData> {
  table: Table<TData>;
}

function ContentContainer<TData>({ table }: ContentContainerProps<TData>) {
  const contentViewportRef = React.useRef<HTMLDivElement | null>(null);

  // Initialize Virtualizer
  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    estimateSize: () => 40, // Estimated row height
    getScrollElement: () => contentViewportRef.current,
    overscan: 5, // Render 5 additional rows before and after the viewport
  });

  return (
    <>
      <div
        className="content-viewport relative h-[300px] overflow-auto"
        ref={contentViewportRef}
      >
        
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const row = table.getRowModel().rows[virtualRow.index];
          return (
            <div
              key={row.id}
              data-index={virtualRow.index}
              className="row absolute flex w-full"
              style={{
                transform: `translateY(${virtualRow.start}px)`, // Position the row using transform
                height: `${virtualRow.size}px`, // Height of the row
              }}
            >
              {row.getVisibleCells().map((cell: Cell<TData, unknown>) => (
                <div
                  key={cell.id}
                  className="viewport-cell border-black-5 text-black-100 typography-regular-12 flex items-center justify-start border-b-1 px-4 py-2"
                  style={{
                    width: `${cell.column.getSize()}px`, // Width of the cell
                    minWidth: DEFAULT_COLUMN_MIN_WIDTH,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ContentContainer;
