import { ECLabel } from '@/components/atoms/label';
import { ECSeparator } from '@/components/atoms/separator';
import { ECControlledCheckbox } from '@/components/molecules/controlled-checkbox';
import { GridApi } from 'ag-grid-community';

export interface ChooseColumnPanelProps {
  gridApi?: GridApi | null;
}

function ChooseColumnPanel({ gridApi }: ChooseColumnPanelProps) {
  if (!gridApi) {
    return null;
  }

  const allDisplayedColumns = gridApi.getAllDisplayedColumns();

  return (
    <div className="__grid_panel rounded-8 border-black-40 backdrop-blur-4 bg-background-1 flex w-[16rem] flex-col border-[0.5px]">
      <div className="__grid_panel_title typography-regular-12 text-black-100 px-8 py-8">
        Choose Columns
      </div>
      <ECSeparator className="" />
      <div className="__grid_panel_content text-black-100 typography-regular-12 flex max-h-[12rem] flex-col gap-4 overflow-auto px-8 py-4">
        {allDisplayedColumns.map((col) => (
          <div key={col.getId()} className="rounded-8 flex items-center gap-4">
            <ECControlledCheckbox
              id={col.getId()}
              className="size-16 rounded-[5px]"
            />
            <ECLabel id={col.getId()}>
              {gridApi.getDisplayNameForColumn(col, 'header')}{' '}
              {JSON.stringify(col.isVisible())}
            </ECLabel>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChooseColumnPanel;
