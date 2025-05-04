import {
  CellContext,
  ColumnDef,
  GroupColumnDef,
  HeaderContext,
} from "@tanstack/react-table";
import { ColDef, GroupColDef } from "./types";
import React from "react";

function renderHeader<TData>(
  colDef: ColDef<TData>,
  headerContext: HeaderContext<TData, unknown>,
) {
  if (colDef.headerRenderer) {
    const headerComponentProps = {
      headerContext,
      ...(colDef.headerRendererParams || {}),
    };

    return React.createElement(
      colDef.headerRenderer,
      headerComponentProps as unknown as object,
    );
  } else {
    return colDef.headerName;
  }
}

function renderCell<TData>(
  colDef: ColDef<TData>,
  cellContext: CellContext<TData, unknown>,
) {
  if (colDef.cellRenderer) {
    const cellComponentProps = {
      cellContext,
      ...(colDef.cellRendererParams || {}),
    };
    return React.createElement(
      colDef.cellRenderer,
      cellComponentProps as unknown as object,
    );
  } else {
    return cellContext.getValue();
  }
}

function transformColumns<TData>(
  columnDefs: (ColDef<TData> | GroupColDef<TData>)[],
): (ColumnDef<TData> | GroupColumnDef<TData>)[] {
  return columnDefs.map((columnDef) => {
    // handle for header group
    if ("columns" in columnDef) {
      return {
        header: columnDef.headerName,
        id: columnDef.groupId,
        columns: transformColumns(columnDef.columns),
      };
    } else {
      // handle for header

      return {
        accessorKey: columnDef.field,
        header: (headerContext: HeaderContext<TData, unknown>) => {
          return renderHeader(columnDef, headerContext);
        },
        cell: (cellContext: CellContext<TData, unknown>) => {
          return renderCell(columnDef, cellContext);
        },
        size: columnDef.size,
      };
    }
  });
}

export { transformColumns };
