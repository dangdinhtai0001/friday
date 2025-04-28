import { flexRender, Cell } from "@tanstack/react-table";

export interface ViewportCellProps<TData> {
    cell: Cell<TData, unknown>;
}

function ViewportCell<TData>({ cell }: ViewportCellProps<TData>) {
    return (
        <div
            key={cell.id}
            className="viewport-cell flex items-center justify-start py-2 px-3 border-b-1 border-black-5 text-black-100 typography-regular-12"
            style={{
                width: `${cell.column.getSize()}px`, // Width of the cell
            }}
        >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
    );
}

export default ViewportCell;
