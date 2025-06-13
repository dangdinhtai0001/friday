import { ECButton } from '@/components/atoms/button';
import IconLoader from '@/components/atoms/icon-loader/ec-icon-loader';
import { ECLabel } from '@/components/atoms/label';
import { ECSeparator } from '@/components/atoms/separator';
import { ECControlledCheckbox } from '@/components/molecules/controlled-checkbox';
import { EventBusInstance } from '@/composables/utils/EventBus';
import { Column, GridApi } from 'ag-grid-community';
import React from 'react';
import { EVENT_NAMESPACE, EVENT_NAME } from '../constants';
import { resolveEventName } from '@/composables/utils/event';
import useKeyboardShortcut from '@/composables/hooks/use-keyboard-shortcut';

export interface ChooseColumnPanelProps {
  gridApi?: GridApi | null;
}

function ChooseColumnPanel({ gridApi }: ChooseColumnPanelProps) {
  if (!gridApi) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [allDisplayedColumns, setAllDisplayedColumns] = React.useState<
    Column[]
  >(gridApi.getAllDisplayedColumns());

  // const allDisplayedColumns = gridApi.getAllDisplayedColumns();

  const handleChange = (val: boolean, col: Column) => {
    console.log(allDisplayedColumns);

    gridApi.setColumnsVisible([col], val);
    setAllDisplayedColumns(gridApi.getAllDisplayedColumns());
  };

  const handleClickClose = () => {
    EventBusInstance.emit(
      resolveEventName(
        EVENT_NAMESPACE,
        EVENT_NAME.CLOSE_PANEL_CHOOSE_COLUMN,
        '',
      ),
    );
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useKeyboardShortcut([
    {
      keys: ['escape'],
      callback: () => {
        handleClickClose();
      },
    },
  ]);

  return (
    <div className="__grid_panel rounded-8 border-black-40 backdrop-blur-4 bg-background-1 flex w-[16rem] flex-col border-[0.5px]">
      <div className="__grid_panel_title typography-regular-14 text-black-100 flex items-center justify-between px-8 py-8">
        <span>Choose Columns</span>
        <ECButton
          leftIcon="x"
          className=""
          variant="icon"
          onClick={handleClickClose}
        ></ECButton>
      </div>
      <ECSeparator className="" />
      <div className="__grid_panel_content text-black-100 typography-regular-12 flex max-h-[12rem] flex-col gap-4 overflow-auto px-8 py-4">
        {gridApi
          .getAllGridColumns()
          .filter((col0) => col0.getId() !== 'ag-Grid-SelectionColumn')
          .map((col) => (
            <div
              key={col.getId()}
              className="rounded-8 flex items-center gap-4"
            >
              <ECControlledCheckbox
                id={col.getId()}
                value={allDisplayedColumns.includes(col)}
                className="size-12 rounded-[3px]"
                onChange={(val) => {
                  handleChange(val as boolean, col);
                }}
                checkedIcon={<IconLoader name="check" className="size-12" />}
              />
              <ECLabel id={col.getId()} className="typography-regular-12">
                {gridApi.getDisplayNameForColumn(col, 'header')} {col.getId()}
              </ECLabel>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ChooseColumnPanel;
