import { ColDef, GridReadyEvent, themeQuartz } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React, { JSX } from 'react';
import './standard.css';

export interface StandardGridProps<TData>
  extends React.ComponentProps<typeof AgGridReact<TData>> {
  height: React.CSSProperties['height'];
  columnDefaults?: ColDef<TData>;
}

function StandardGrid<TData>(
  {
    height,
    onGridReady,
    columnDefaults: defaultColDefOverrides,
    ...props
  }: StandardGridProps<TData>,
  ref: React.ForwardedRef<AgGridReact<TData>>,
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gridApi, setGridApi] = React.useState<GridReadyEvent['api'] | null>(
    null,
  );

  const handleGridReady = React.useCallback(
    (params: GridReadyEvent) => {
      setGridApi(params.api);

      if (onGridReady) {
        onGridReady(params);
      }
    },
    [onGridReady],
  );

  const defaultColDef: ColDef<TData> = React.useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      sortable: true,
      filter: false,
      resizable: false,
      floatingFilter: false,
      editable: false,
      ...defaultColDefOverrides,
    };
  }, [defaultColDefOverrides]);

  return (
    <div style={{ height: height }}>
      <AgGridReact<TData>
        theme={themeQuartz}
        onGridReady={handleGridReady}
        defaultColDef={defaultColDef}
        ref={ref}
        {...props}
      />
    </div>
  );
}

// export default StandardGrid;
export default React.forwardRef(StandardGrid) as <TData>(
  props: StandardGridProps<TData> & {
    ref?: React.ForwardedRef<AgGridReact<TData>>;
  },
) => JSX.Element;
