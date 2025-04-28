import { Row, Cell } from "@tanstack/react-table";
import { VirtualItem } from "@tanstack/react-virtual";
import { ViewportCell } from ".";

export interface ViewportRowProps<TData> {
    row: Row<TData>;
    virtualRow: VirtualItem;
}
function ViewportRow<TData>({ row, virtualRow }: ViewportRowProps<TData>) {
    return (
        <div
            key={row.id}
            data-index={virtualRow.index}
            className="row flex absolute w-full"
            style={{
                transform: `translateY(${virtualRow.start}px)`, // Position the row using transform
                height: `${virtualRow.size}px`, // Height of the row
            }}
        >
            {row.getVisibleCells().map((cell: Cell<TData, unknown>) => (
                <ViewportCell key={cell.id} cell={cell} />
            ))}
        </div>
    );
}

export default ViewportRow;
