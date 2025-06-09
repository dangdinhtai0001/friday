import { CoreDataGridProps } from '@/components/molecules/core-data-grid';
import EcCoreDataGrid from '@/components/molecules/core-data-grid/ec-core-data-grid';
import { GridReadyEvent } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EnhancedDataGridProps<TData>
  extends CoreDataGridProps<TData> {}

function EnhancedDataGrid<TData>(
  { onGridReady, ...props }: EnhancedDataGridProps<TData>,
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
  
  return (
    <>
      <EcCoreDataGrid
        onGridReady={handleGridReady}
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
