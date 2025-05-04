import { Table } from "@tanstack/react-table";
import React from "react";

export interface DataGridProps<TData = unknown> {
  columnDefs: (ColDef<TData> | GroupColDef<TData>)[];
  data: TData[];
}

export interface ColDef<TData = unknown> {
  field: string;
  size?: number;
  // header
  headerName: string;
  headerRenderer?: React.ComponentType;
  headerRendererParams?: unknown;
  // cell
  cellRenderer?: React.ComponentType;
  cellRendererParams?: unknown;
}
export interface GroupColDef<TData = unknown> {
  headerName: string;
  groupId: string;
  columns: ColDef<TData>[] | GroupColDef<TData>[];
}

export interface DataGridState<TData> {
  id: string;
  tableInstance?: Table<TData>;
  columnHeaders?: Record<string, React.ReactNode>;
}

export interface DataGridActions<TData> {
  initialTableInstance: (table: Table<TData>) => void;
  patchColumnHeaders: (columnHeaders: Record<string, React.ReactNode>) => void;
}

export interface DataGridContextValue<TData> {
  state: DataGridState<TData>;
  actions: DataGridActions<TData>;
}