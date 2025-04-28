import { DataGridProps } from "./types/grid";
import useDataGrid from "./core/useDataGrid";
import { HeaderContainer } from "./ui/header";
import { Viewport } from "./ui/viewport";

function DataGrid<TData>(props: DataGridProps<TData>) {
  const { columns, data, className } = props;

  const table = useDataGrid<TData>({ columns, data });



  return (
    <div className="p-2">
      <div>
        {/* Header */}
        <HeaderContainer table={table} />

        {/* Viewport */}
        <Viewport table={table} />

        {/* Body */}
        {/* <div>
          {table.getRowModel().rows.map((row) => (
            <div key={row.id} className="flex flex-row">
              {row.getVisibleCells().map((cell) => (
                <div key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default DataGrid;
