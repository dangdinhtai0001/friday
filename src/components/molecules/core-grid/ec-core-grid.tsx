import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridReadyEvent, themeQuartz } from 'ag-grid-community';
import './grid-theme.css';

export interface CoreGridProps<TData>
  extends React.ComponentProps<typeof AgGridReact<TData>> {
  height: React.CSSProperties['height'];
  columnDefaults?: ColDef<TData>;
}

function CoreGrid() {
  return <div></div>;
}

// export default StandardGrid;
export default React.forwardRef(CoreGrid) as <TData>(
  props: CoreGridProps<TData> & {
    ref?: React.ForwardedRef<AgGridReact<TData>>;
  },
) => React.JSX.Element;
