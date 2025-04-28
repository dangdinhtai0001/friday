import { ColDef, GroupColDef } from "./column";

export interface UseDataGridOptions<TData> {
  columns: (ColDef<TData> | GroupColDef<TData>)[];
  data: TData[];
}

export interface DataGridProps<TData> extends UseDataGridOptions<TData> {
  className?: string;
}
