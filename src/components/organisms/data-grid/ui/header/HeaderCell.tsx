import { flexRender, Header } from "@tanstack/react-table";

export interface HeaderCellProps<TData> {
    header: Header<TData, unknown>;
}

function HeaderCell<TData>({ header }: HeaderCellProps<TData>) {
    // Kiểm tra nếu header là group header
    const leafColumns = header.column.getLeafColumns();
    const isGroupHeader = leafColumns.length > 0;

    // Tính toán độ rộng
    const headerWidth = isGroupHeader
        ? leafColumns.reduce((sum, col) => sum + col.getSize(), 0)
        : header.column.getSize();

    return (
        <div
            className="header-cell border-b-1 border-black-20 py-2 px-3 typography-regular-12 text-black-40 w-full"
            style={{
                width: `${headerWidth}px`,
                flexShrink: 1,
                flexGrow: 0,
                minWidth: 100,
                textOverflow: "ellipsis", // Hiển thị dấu "..." khi nội dung bị cắt
                whiteSpace: "nowrap", // Ngăn nội dung xuống dòng
            }}
        >
            {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
        </div>
    );
}

export default HeaderCell;
