import { Table } from "@tanstack/react-table";
import { VirtualItem } from "@tanstack/react-virtual";
import { ContentRow } from ".";

export interface ContentContainerProps<TData> {
    totalHeight: number;
    virtualRows: VirtualItem[];
    table: Table<TData>;
}

function ContentContainer<TData>({ totalHeight, virtualRows, table }: ContentContainerProps<TData>) {
    return (
        <div className="viewport-container w-full relative" style={{ height: `${totalHeight}px` }}>
            {virtualRows.map((virtualRow) => {
                const row = table.getRowModel().rows[virtualRow.index];
                return (
                    <ContentRow key={row.id} row={row} virtualRow={virtualRow} />
                );
            })}
        </div>
    );
}

export default ContentContainer;
