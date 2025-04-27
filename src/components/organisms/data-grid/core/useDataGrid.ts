import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { type ColumnDef, type GroupColumnDef } from "@tanstack/react-table";
import { ColDef, GroupColDef, UseDataGridOptions } from "../types";

const transformColumns = <TData>(
  columns: (ColDef<TData> | GroupColDef<TData>)[],
): (ColumnDef<TData> | GroupColumnDef<TData>)[] => {
  return columns.map((column) => {
    if ("columns" in column) {
      return {
        header: column.headerName,
        id: column.groupId,
        columns: transformColumns(column.columns),
      };
    } else {
      return {
        header: column.headerName,
        accessorKey: column.field,
      };
    }
  });
};

export const useDataGrid = <TData>(props: UseDataGridOptions<TData>) => {
  const { columns, data } = props;

  const tableColumns = transformColumns(columns);

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return table;
};
