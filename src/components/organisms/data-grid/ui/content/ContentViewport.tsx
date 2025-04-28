import React from "react";
import { Table } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ContentContainer } from ".";

export interface ContentViewportProps<TData> {
    table: Table<TData>;
}

function ContentViewport<TData>({ table }: ContentViewportProps<TData>) {
    const contentViewportRef = React.useRef<HTMLDivElement | null>(null);

    // Initialize Virtualizer
    const rowVirtualizer = useVirtualizer({
        count: table.getRowModel().rows.length,
        estimateSize: () => 40, // Estimated row height
        getScrollElement: () => contentViewportRef.current,
        overscan: 5, // Render 5 additional rows before and after the viewport
    });

    return (
        <div className="content-viewport w-full overflow-auto relative h-[300px]" ref={contentViewportRef}        >
            {/* Render the Container */}
            <ContentContainer totalHeight={rowVirtualizer.getTotalSize()} virtualRows={rowVirtualizer.getVirtualItems()} table={table} />
        </div>
    );
}

export default ContentViewport;