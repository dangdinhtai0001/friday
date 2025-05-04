import { ColDef, GroupColDef } from "./column";
import { Table } from "@tanstack/react-table";

export interface UseDataGridOptions<TData> {
  columns: (ColDef<TData> | GroupColDef<TData>)[];
  data: TData[];
}

export interface DataGridProps<TData> extends UseDataGridOptions<TData> {
  className?: string;
  children?: React.ReactNode;
}

export interface DataGridState<TData> {
  id: string;
  table?: Table<TData>
}

export interface DataGridActions<TData> {
  initialTableInstance: (table: Table<TData>) => void;
}

export interface DataGridContextValue<TData> {
  state: DataGridState<TData>;
  actions: DataGridActions<TData>;
}
