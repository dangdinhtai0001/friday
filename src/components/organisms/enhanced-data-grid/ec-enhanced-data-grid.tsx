import { CoreDataGridProps } from '@/components/molecules/core-data-grid';
import EcCoreDataGrid from '@/components/molecules/core-data-grid/ec-core-data-grid';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';
import DataGridColumnHeader from './header/data-grid-column-header';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EnhancedDataGridProps<TData>
  extends CoreDataGridProps<TData> {}

function EnhancedDataGrid<TData>(
  {
    onGridReady,
    columnDefaults: columnDefaultsProp,
    ...props
  }: EnhancedDataGridProps<TData>,
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

  const columnDefaults: ColDef<TData> = React.useMemo(() => {
    return {
      headerComponent: DataGridColumnHeader,
      headerComponentParams: { enableMenu: true },
      resizable: true,
      ...columnDefaultsProp,
    };
  }, [columnDefaultsProp]);

  return (
    <>
      <EcCoreDataGrid
        onGridReady={handleGridReady}
        columnDefaults={columnDefaults}
        {...props}
        ref={ref}
      ></EcCoreDataGrid>
    </>
  );
}

export default React.forwardRef(EnhancedDataGrid) as <TData>(
  props: EnhancedDataGridProps<TData> & {
    ref?: React.ForwardedRef<AgGridReact<TData>>;
  },
) => React.JSX.Element;
