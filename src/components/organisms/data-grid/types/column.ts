export interface ColDef<TData> {
  field: string;
  headerName: string;
}

export interface GroupColDef<TData> {
  headerName: string;
  groupId: string;
  columns: ColDef<TData>[] | GroupColDef<TData>[];
}
