import { flexRender, Header } from "@tanstack/react-table";
import { DEFAULT_COLUMN_MIN_WIDTH } from "../../core/constants";

export interface HeaderCellProps<TData> {
    header: Header<TData, unknown>;
}

function HeaderCell<TData>({ header }: HeaderCellProps<TData>) {
    // Kiểm tra nếu header là group header
    const leafColumns = header.column.getLeafColumns();
    const isGroupHeader = leafColumns.length > 1;

    // Tính toán độ rộng
    const headerWidth = isGroupHeader
        ? leafColumns.reduce((sum, col) => sum + col.getSize(), 0)
        : header.column.getSize();

    return (
        <div
            className="header-cell border-b-1 border-black-20 py-2 px-3 typography-regular-12 text-black-40 w-full "
            style={{
                width: `${headerWidth}px`,
                minWidth: isGroupHeader ? DEFAULT_COLUMN_MIN_WIDTH * leafColumns.length : DEFAULT_COLUMN_MIN_WIDTH,
            }}
        >
            <div className="w-full text-ellipsis whitespace-nowrap">
                {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
            </div>
        </div>
    );
}

export default HeaderCell;
