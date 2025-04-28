import {
  useReactTable,
  getCoreRowModel,
  HeaderContext,
  CellContext,
  Cell,
  ColumnDefTemplate,
} from "@tanstack/react-table";
import { type ColumnDef, type GroupColumnDef } from "@tanstack/react-table";
import { ColDef, GroupColDef, UseDataGridOptions } from "../types";
import HeaderCellComponent from "../ui/header/HeaderCellComponent";
import React from "react";
import { ContentComponent } from "../ui/content";
import ContentCellComponent from "../ui/content/ContentCellComponent";
function renderHeader<TData>(
  header: string | ((props: HeaderContext<TData, unknown>) => React.ReactNode),
): React.ReactNode {
  if (typeof header === "string") {
    return <HeaderCellComponent>{header}</HeaderCellComponent>;
  } else {
    return React.createElement(header);
  }
}

function renderContent<TData>(
  content: string | ((props: CellContext<TData, unknown>) => React.ReactNode),
): React.ReactNode {
  if (typeof content === "string") {
    return <ContentComponent>{content}</ContentComponent>;
  } else {
    return React.createElement(content);
  }
}

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
      // Xử lý ColDef
      let header = column.headerName;

      if (column.headerComponent) {
        header = () => React.createElement(column.headerComponent!);
      } else {
        header = () => (
          <HeaderCellComponent>
            {renderHeader(column.headerName)}
          </HeaderCellComponent>
        );
      }

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

  const table = useReactTable({
    data,
    columns: tableColumns as ColumnDef<TData>[],
    getCoreRowModel: getCoreRowModel(),
  });

  return table;
}

export default useDataGrid;
