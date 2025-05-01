import {
  useReactTable,
  getCoreRowModel,
  HeaderContext,
  CellContext,
  ColumnOrderState,
} from "@tanstack/react-table";
import { type ColumnDef, type GroupColumnDef } from "@tanstack/react-table";
import { ColDef, GroupColDef, UseDataGridOptions } from "../types";
import { HeaderCellComponent } from "../ui/header";
import React from "react";
import { ContentCellComponent } from "../ui/content";

function transformColumns<TData>(
  columns: (ColDef<TData> | GroupColDef<TData>)[],
): (ColumnDef<TData> | GroupColumnDef<TData>)[] {
  return columns.map((column) => {
    if ("columns" in column) {
      // Xử lý GroupColDef
      return {
        header: column.headerName,
        id: column.groupId,
        columns: transformColumns(column.columns),
      };
    } else {
      const header = (headerContext: HeaderContext<TData, unknown>) => {
        if (column.headerComponent) {
          // Tạo props bằng cách kết hợp các tham số
          const componentProps = {
            ...(column.headerComponentParams || {}),
            headerContext, // Thêm context vào props
          };

          // Sử dụng type assertion để tránh lỗi
          return React.createElement(
            column.headerComponent,
            componentProps as unknown as object,
          );
        } else {
          if (typeof column.headerName === "string") {
            return (
              <HeaderCellComponent headerContext={headerContext}>
                {column.headerName}
              </HeaderCellComponent>
            );
          }
          if (typeof column.headerName === "function") {
            return column.headerName(headerContext);
          }
        }
      };

      // Xử lý ColDef
      return {
        header: header,
        accessorKey: column.field,
        cell: (props: CellContext<TData, unknown>): React.ReactNode => {
          if (column.contentComponent) {
            return <div>1</div>;
          } else {
            return <ContentCellComponent {...props}> </ContentCellComponent>;
          }
        },
      };
    }
  });
}

function useDataGrid<TData>({ columns, data }: UseDataGridOptions<TData>) {
  const tableColumns = transformColumns(columns);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([]);

  const table = useReactTable({
    data,
    columns: tableColumns as ColumnDef<TData>[],
    state: {
      columnVisibility,
      columnOrder,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return table;
}

export default useDataGrid;
