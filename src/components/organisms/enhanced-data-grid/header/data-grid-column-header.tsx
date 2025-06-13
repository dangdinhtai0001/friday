import { ECButton } from '@/components/atoms/button';
import { ECIconLoader } from '@/components/atoms/icon-loader';
import IconLoader from '@/components/atoms/icon-loader/ec-icon-loader';
import {
  ECDropdownMenu,
  ECDropdownMenuContent,
  ECDropdownMenuGroup,
  ECDropdownMenuItem,
  ECDropdownMenuPortal,
  ECDropdownMenuSeparator,
  ECDropdownMenuSub,
  ECDropdownMenuSubContent,
  ECDropdownMenuSubTrigger,
  ECDropdownMenuTrigger,
} from '@/components/molecules/dropdown-menu';
import { DataGridColumnHeaderProps } from './types';
import { ColumnPinnedType } from 'ag-grid-community';
import { cn } from '@/composables/utils/shadcn';
import { EventBusInstance } from '@/composables/utils/EventBus';
import { resolveEventName } from '@/composables/utils/event';
import { EVENT_NAME, EVENT_NAMESPACE } from '../constants';

function DataGridColumnHeader({
  displayName,
  enableMenu,
  api: gridApi,
  column,
}: DataGridColumnHeaderProps) {
  const handlePinColumn = (pinned: ColumnPinnedType) => {
    gridApi?.applyColumnState({
      state: [
        {
          colId: column.getColId(),
          pinned,
        },
      ],
    });
  };

  const handleAutoSizeThisColumn = (skipHeader: boolean) => {
    gridApi?.autoSizeColumns([column.getColId()], skipHeader);
  };

  const handleAutoSizeAllColumns = (skipHeader: boolean) => {
    const allColumnIds: string[] = [];
    gridApi!.getColumns()!.forEach((column) => {
      allColumnIds.push(column.getId());
    });
    gridApi!.autoSizeColumns(allColumnIds, skipHeader);
  };

  const handleChooseColumn = () => {
    EventBusInstance.emit(
      resolveEventName(
        EVENT_NAMESPACE,
        EVENT_NAME.OPEN_PANEL_CHOOSE_COLUMN,
        '',
      ),
    );
  };

  const handleResetColumn = () => {
    gridApi.resetColumnState();
    gridApi.resetColumnGroupState();
  };

  return (
    <div className="flex h-full w-full items-center justify-between gap-4">
      <div className="typography-regular-12">{displayName}</div>
      {/* ------- Dropdown Menu ------- */}
      {enableMenu && (
        <ECDropdownMenu>
          <ECDropdownMenuTrigger asChild>
            <ECButton
              variant="borderless"
              leftIcon={<ECIconLoader name="dots-vertical" />}
            />
          </ECDropdownMenuTrigger>
          <ECDropdownMenuContent
            className="bg-background-2 rounded-8 text-black-100 w-[12rem]"
            sideOffset={14}
          >
            <ECDropdownMenuGroup className="__sort_group">
              <ECDropdownMenuItem className="justify-start">
                <IconLoader name="sort-ascending-2" />
                <span className="typography-regular-12">Sort asc</span>
              </ECDropdownMenuItem>
              <ECDropdownMenuItem className="justify-start">
                <IconLoader name="sort-descending-2" />
                <span className="typography-regular-12">Sort desc</span>
              </ECDropdownMenuItem>
            </ECDropdownMenuGroup>
            <ECDropdownMenuSeparator />
            <ECDropdownMenuGroup className="__pin_group">
              <ECDropdownMenuSub>
                <ECDropdownMenuSubTrigger>
                  <IconLoader name="pinned" />
                  <span className="typography-regular-12 grow">Pin column</span>
                </ECDropdownMenuSubTrigger>
                <ECDropdownMenuPortal>
                  <ECDropdownMenuSubContent
                    className="bg-background-2 rounded-8 text-black-100 w-[12rem]"
                    sideOffset={14}
                  >
                    <ECDropdownMenuItem
                      className="justify-start"
                      onClick={() => handlePinColumn(null)}
                    >
                      <IconLoader
                        name="check"
                        className={cn(
                          column.getPinned() === null ? 'visible' : 'invisible',
                        )}
                      />
                      <span className="typography-regular-12">No pin</span>
                    </ECDropdownMenuItem>
                    <ECDropdownMenuItem
                      className="justify-start"
                      onClick={() => handlePinColumn('left')}
                    >
                      <IconLoader
                        name="check"
                        className={cn(
                          column.getPinned() === 'left'
                            ? 'visible'
                            : 'invisible',
                        )}
                      />
                      <span className="typography-regular-12">Pin left</span>
                    </ECDropdownMenuItem>
                    <ECDropdownMenuItem
                      className="justify-start"
                      onClick={() => handlePinColumn('right')}
                    >
                      <IconLoader
                        name="check"
                        className={cn(
                          column.getPinned() === 'right'
                            ? 'visible'
                            : 'invisible',
                        )}
                      />
                      <span className="typography-regular-12">Pin right</span>
                    </ECDropdownMenuItem>
                  </ECDropdownMenuSubContent>
                </ECDropdownMenuPortal>
              </ECDropdownMenuSub>
            </ECDropdownMenuGroup>
            <ECDropdownMenuSeparator />
            <ECDropdownMenuGroup className="__autosize_group">
              <ECDropdownMenuItem
                onClick={() => {
                  handleAutoSizeThisColumn(false);
                }}
              >
                <span className="typography-regular-12">
                  Auto size this column
                </span>
              </ECDropdownMenuItem>
              <ECDropdownMenuItem
                onClick={() => handleAutoSizeAllColumns(false)}
              >
                <span className="typography-regular-12">
                  Auto size all columns
                </span>
              </ECDropdownMenuItem>
            </ECDropdownMenuGroup>
            <ECDropdownMenuSeparator />
            <ECDropdownMenuGroup className="__visibility_group">
              <ECDropdownMenuItem
                className="justify-start"
                onClick={() => handleChooseColumn()}
              >
                <IconLoader name="columns-3" />
                <span className="typography-regular-12">Choose columns</span>
              </ECDropdownMenuItem>
              <ECDropdownMenuItem onClick={() => handleResetColumn()}>
                <span className="typography-regular-12">Reset column</span>
              </ECDropdownMenuItem>
            </ECDropdownMenuGroup>
          </ECDropdownMenuContent>
        </ECDropdownMenu>
      )}
    </div>
  );
}

export default DataGridColumnHeader;
