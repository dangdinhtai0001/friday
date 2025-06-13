import { CoreDataGridProps } from '@/components/molecules/core-data-grid';
import EcCoreDataGrid from '@/components/molecules/core-data-grid/ec-core-data-grid';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';
import DataGridColumnHeader from './header/data-grid-column-header';
import ChooseColumnPanel from './panel/choose-column-panel';
import { AnimatePresence, motion } from 'motion/react';
import useEventListeners from '@/composables/hooks/use-event-listeners';
import { EventBusInstance } from '@/composables/utils/EventBus';
import { EVENT_NAMESPACE, EVENT_NAME } from './constants';
import { resolveEventName } from '@/composables/utils/event';

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
  const [isOpenChooseColumnPanel, setIsOpenChooseColumnPanel] =
    React.useState(false);

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

  const constraintsRef = React.useRef<HTMLDivElement>(null);

  const defaultEventHandlers = React.useMemo(
    () => ({
      [resolveEventName(
        EVENT_NAMESPACE,
        EVENT_NAME.OPEN_PANEL_CHOOSE_COLUMN,
        '',
      )]: () => {
        setIsOpenChooseColumnPanel(true);
      },
      [resolveEventName(
        EVENT_NAMESPACE,
        EVENT_NAME.CLOSE_PANEL_CHOOSE_COLUMN,
        '',
      )]: () => {
        setIsOpenChooseColumnPanel(false);
      },
    }),
    [],
  );

  useEventListeners(defaultEventHandlers, EventBusInstance);

  return (
    <div className="relative h-full w-full" ref={constraintsRef}>
      {/* ----- panel ----- */}
      <AnimatePresence>
        {isOpenChooseColumnPanel && (
          <motion.div
            className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.2}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              duration: 0.25,
              ease: 'easeOut',
            }}
          >
            <ChooseColumnPanel gridApi={gridApi} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* ----- grid ----- */}
      <EcCoreDataGrid
        onGridReady={handleGridReady}
        columnDefaults={columnDefaults}
        {...props}
        ref={ref}
      ></EcCoreDataGrid>
    </div>
  );
}

export default React.forwardRef(EnhancedDataGrid) as <TData>(
  props: EnhancedDataGridProps<TData> & {
    ref?: React.ForwardedRef<AgGridReact<TData>>;
  },
) => React.JSX.Element;
