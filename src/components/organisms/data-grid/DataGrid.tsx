import { DataGridProps } from "./types/grid";
import useDataGrid from "./core/useDataGrid";
import { HeaderContainer } from "./ui/header";
import { ContentContainer } from "./ui/content";
import { ChooseColumnPanel } from "./ui/panel";

function DataGrid<TData>(props: DataGridProps<TData>) {
  const { columns, data } = props;

  const table = useDataGrid<TData>({ columns, data });

  return (
    <div className="data-grid w-full p-2 relative">
      <ChooseColumnPanel />

      {/* Header */}
      <HeaderContainer table={table} />

      {/* Content */}
      <ContentContainer table={table} />
    </div>
  );
}

function DataGridProvider<TData>(props: DataGridProps<TData>) {
  return <DataGrid {...props} />;
}

export { DataGrid, DataGridProvider };
