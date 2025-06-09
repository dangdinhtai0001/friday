import { ECStandardGrid } from '@/components/organisms/data-grid';
import React from 'react';
import { ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { ECEnhancedDataGrid } from '@/components/organisms/enhanced-data-grid';

interface IRowData {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

function Page() {
  // Row Data: The data to be displayed.
  const [rowData] = React.useState<IRowData[]>([
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = React.useState<
    (ColDef<IRowData> | ColGroupDef<IRowData>)[]
  >([
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
    { field: 'electric' },
  ]);

  const gridRef = React.useRef<AgGridReact<IRowData>>(null);

  return (
    // <div>
    //   <ECStandardGrid<IRowData>
    //     height={500}
    //     rowData={rowData}
    //     columnDefs={colDefs}
    //     rowSelection={{ mode: 'multiRow' }}
    //     suppressCellFocus
    //     ref={gridRef}
    //   />
    //   <button
    //     onClick={() => {
    //       gridRef.current?.api.applyTransaction({
    //         add: [
    //           { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    //         ],
    //         addIndex: 0,
    //       });
    //     }}
    //   >
    //     add
    //   </button>
    // </div>

    <div>
      <ECEnhancedDataGrid<IRowData>
        height={500}
        rowData={rowData}
        columnDefs={colDefs}
        rowSelection={{ mode: 'multiRow' }}
        suppressCellFocus
        ref={gridRef}
      />
    </div>
  );
}

export default Page;
