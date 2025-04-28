import { HeaderContext } from "@tanstack/react-table";
import React from "react";

export interface ColDef<TData> {
  field: string;
  headerName:
    | string
    | ((props: HeaderContext<TData, unknown>) => React.ReactNode);
  headerComponent?: React.ComponentType;
  contentComponent?: React.ComponentType;
}

export interface GroupColDef<TData> {
  headerName: string;
  groupId: string;
  columns: ColDef<TData>[] | GroupColDef<TData>[];
}
