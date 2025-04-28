import React from "react";
import { Table } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ViewportContainer } from ".";

export interface ViewportProps<TData> {
    table: Table<TData>;
}

function Viewport<TData>({ table }: ViewportProps<TData>) {
    const tableContainerRef = React.useRef<HTMLDivElement | null>(null);

    // Initialize Virtualizer
    const rowVirtualizer = useVirtualizer({
        count: table.getRowModel().rows.length,
        estimateSize: () => 40, // Estimated row height
        getScrollElement: () => tableContainerRef.current,
        overscan: 5, // Render 5 additional rows before and after the viewport
    });

    return (
        <div className="viewport w-full overflow-auto relative h-[300px]" ref={tableContainerRef}        >
            {/* Render the Container */}
            <ViewportContainer totalHeight={rowVirtualizer.getTotalSize()} virtualRows={rowVirtualizer.getVirtualItems()} table={table} />
        </div>
    );
}

export default Viewport;