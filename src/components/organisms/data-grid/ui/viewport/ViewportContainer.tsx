import { Table } from "@tanstack/react-table";
import { VirtualItem } from "@tanstack/react-virtual";
import { ViewportRow } from ".";

export interface ContainerProps<TData> {
    totalHeight: number;
    virtualRows: VirtualItem[];
    table: Table<TData>;
}

function ViewportContainer<TData>({ totalHeight, virtualRows, table }: ContainerProps<TData>) {
    return (
        <div className="viewport-container w-full relative" style={{ height: `${totalHeight}px` }}>
            {virtualRows.map((virtualRow) => {
                const row = table.getRowModel().rows[virtualRow.index];
                return (
                    <ViewportRow key={row.id} row={row} virtualRow={virtualRow} />
                );
            })}
        </div>
    );
}

export default ViewportContainer;
