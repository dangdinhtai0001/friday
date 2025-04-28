import React from "react";
import { Table } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

interface HeaderViewportProps<TData> {
  table: Table<TData>;
}

function HeaderViewport<TData>({ table }: HeaderViewportProps<TData>) {
  const headerViewportRef = React.useRef<HTMLDivElement | null>(null);

   // Lấy danh sách các cột hiển thị
   const visibleColumns = table.getVisibleLeafColumns();

  // Initialize Virtualizer
  const columnVirtualizer = useVirtualizer({
    count: visibleColumns.length, // Số lượng cột cần ảo hóa
    estimateSize: (index) => visibleColumns[index].getSize(), // Ước tính kích thước (chiều rộng) của mỗi cột
    getScrollElement: () => headerViewportRef.current, // Phần tử chứa bảng có thể cuộn
    horizontal: true, // Dùng cho cuộn ngang (cột)
    overscan: 3, // Số lượng cột thêm vào mỗi bên ngoài vùng hiển thị để đảm bảo hiệu suất
  });

  // Lấy danh sách các cột ảo hóa
  const virtualColumns = columnVirtualizer.getVirtualItems();

  // Tính toán padding trái và phải
  let virtualPaddingLeft: number | undefined;
  let virtualPaddingRight: number | undefined;
  if (virtualColumns?.length) {
    virtualPaddingLeft = virtualColumns[0]?.start ?? 0;
    virtualPaddingRight =
      columnVirtualizer.getTotalSize() -
      (virtualColumns[virtualColumns.length - 1]?.end ?? 0);
  }

  return (
    <div
      className="header-viewport  w-full"
      style={{
        overflow: "hidden", // Đảm bảo không có thanh cuộn dọc
        position: "relative",
        height: "40px", // Chiều cao cố định cho header
      }}
      ref={headerViewportRef}
    >
      <div
        className="header-container flex w-full"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          width: `${columnVirtualizer.getTotalSize()}px`, // Tổng chiều rộng của tất cả các cột
        }}
      >
        {/* Padding trái */}
        {virtualPaddingLeft ? (
          <div
            className="header-cell"
            style={{ flex: `0 0 ${virtualPaddingLeft}px` }}
          />
        ) : null}

        {/* Render các cột ảo hóa */}
        {virtualColumns.map((virtualColumn) => {
          const column = visibleColumns[virtualColumn.index];
          return (
            <div
              key={column.id}
              className="header-cell flex items-center justify-center"
              style={{
                width: `${column.getSize()}px`,
                flex: `0 0 ${column.getSize()}px`,
              }}
            >
              <div
                className={
                  column.getCanSort() ? "cursor-pointer select-none" : ""
                }
                onClick={column.getToggleSortingHandler()}
              >
                123
            
              </div>
            </div>
          );
        })}

        {/* Padding phải */}
        {virtualPaddingRight ? (
          <div
            className="header-cell"
            style={{ flex: `0 0 ${virtualPaddingRight}px` }}
          />
        ) : null}
      </div>
    </div>
  );
}

export default HeaderViewport;
