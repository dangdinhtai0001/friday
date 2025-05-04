import { HeaderContext } from "@tanstack/react-table";
import React from "react";

export interface ColDef<TData> {
  field: string;
  headerName:
    | string
    | ((props: HeaderContext<TData, unknown>) => React.ReactNode);
  headerComponent?: React.ComponentType;
  headerComponentParams?: unknown;
  contentComponent?: React.ComponentType;
  size?: number;
}

export interface GroupColDef<TData> {
  headerName: string;
  groupId: string;
  columns: ColDef<TData>[] | GroupColDef<TData>[];
}
