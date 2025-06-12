import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, themeQuartz } from 'ag-grid-community';
import './grid-theme.css';

export interface CoreDataGridProps<TData>
  extends Omit<React.ComponentProps<typeof AgGridReact<TData>>, 'children'> {
  height: React.CSSProperties['height'];
  columnDefaults?: ColDef<TData>;
}

function CoreDataGrid<TData>(
  {
    height,
    columnDefaults,
    ...props
  }: CoreDataGridProps<TData>,
  ref: React.ForwardedRef<AgGridReact<TData>>,
) {
  const defaultColDef: ColDef<TData> = React.useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      sortable: true,
      filter: false,
      resizable: false,
      floatingFilter: false,
      editable: false,
      ...columnDefaults,
    };
  }, [columnDefaults]);

  return (
    <div style={{ height: height }}>
      <AgGridReact<TData>
        theme={themeQuartz}
        defaultColDef={defaultColDef}
        ref={ref}
        {...props}
      />
    </div>
  );
}

export default React.forwardRef(CoreDataGrid) as <TData>(
  props: CoreDataGridProps<TData> & {
    ref?: React.ForwardedRef<AgGridReact<TData>>;
  },
) => React.JSX.Element;
