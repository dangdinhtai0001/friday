import { DataGridProps } from "./types/grid";
import { useDataGrid } from "./core/useDataGrid";
import { flexRender } from "@tanstack/react-table";

function DataGrid<TData>(props: DataGridProps<TData>) {
  const { columns, data, className } = props;

  const table = useDataGrid<TData>({ columns, data });

  console.log(table.getHeaderGroups());

  return (
    <div className="p-2">
      <div>
        {/* Header */}
        <div className="flex flex-row">
          {table.getHeaderGroups().map((headerGroup) => (
            <div key={headerGroup.id} className="flex flex-row">
              {headerGroup.headers.map((header) => (
                <div key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Body */}
        <div>
          {table.getRowModel().rows.map((row) => (
            <div key={row.id} className="flex flex-row">
              {row.getVisibleCells().map((cell) => (
                <div key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DataGrid;
