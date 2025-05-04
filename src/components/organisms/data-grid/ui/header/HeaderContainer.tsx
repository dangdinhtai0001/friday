import { Table, flexRender } from "@tanstack/react-table";
import { DEFAULT_COLUMN_MIN_WIDTH } from "../../core/constants";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
interface HeaderContainerProps<TData> {
  table: Table<TData>;
}

function HeaderContainer<TData>({ table }: HeaderContainerProps<TData>) {
  const columnOrder = table.getState().columnOrder;
  return (
    <div className="header-container relative">
      {table.getHeaderGroups().map((headerGroup, rowIndex) => (
        <div
          key={rowIndex}
          className="header-row flex w-fit"
          style={{ top: rowIndex * 30 }}
        >
          <SortableContext
            items={columnOrder}
            strategy={horizontalListSortingStrategy}
          >
            {headerGroup.headers.map((header) => {
              // Kiểm tra nếu header là group header
              const leafColumns = header.column.getLeafColumns();
              const isGroupHeader = leafColumns.length > 1;

              // Tính toán độ rộng
              const headerWidth = isGroupHeader
                ? leafColumns.reduce((sum, col) => sum + col.getSize(), 0)
                : header.column.getSize();

              return (
                <div
                  key={header.id}
                  className="header-cell border-black-20 typography-regular-12 text-black-40 w-fit border-b-1 px-4 py-2"
                  style={{
                    width: `${headerWidth}px`,
                    minWidth: isGroupHeader
                      ? DEFAULT_COLUMN_MIN_WIDTH * leafColumns.length
                      : DEFAULT_COLUMN_MIN_WIDTH,
                  }}
                >
                  <div className="text-ellipsis whitespace-nowrap">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </div>
                </div>
              );
            })}
          </SortableContext>
        </div>
      ))}
    </div>
  );
}

export default HeaderContainer;
