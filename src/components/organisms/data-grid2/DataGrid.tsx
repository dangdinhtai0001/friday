import {
  Cell,
  ColumnDef,
  ColumnOrderState,
  ColumnResizeDirection,
  ColumnResizeMode,
  flexRender,
  getCoreRowModel,
  Table,
  useReactTable,
} from "@tanstack/react-table";
import { DataGridProps } from "./types";
import React, { PropsWithChildren, useMemo } from "react";
import { transformColumns } from "./utils";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import HeaderCellComp from "./header/HeaderCellComp";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { useVirtualizer } from "@tanstack/react-virtual";
import CellComponent from "./cells/CellComponent";
import DataGridProvider from "./context/DataGridProvider";
import { resolveEventName } from "@/composables/lib/utils";
import { EVENT_NAME, EVENT_NAMESPACE } from "./constants";
import { useDataGridContext } from "./context/DataGridContext";
import useEventListeners from "@/composables/hooks/useEventListeners";
import { EventBusInstance } from "@/composables/lib/EventBus";
import { ChooseColumnPanel } from "./plugins";
import { motion, AnimatePresence } from "framer-motion";

// Định nghĩa variants
const columnVariants = {
  initial: {
    opacity: 0,
    x: 50, // Trượt từ phải vào
  },
  animate: {
    opacity: 1,
    x: 0, // Về vị trí ban đầu
    transition: {
      type: "spring", // Sử dụng spring physics để tạo cảm giác thật hơn
      stiffness: 120,
      damping: 15,
      duration: 0.1,
    },
  },
  exit: {
    opacity: 0,
    x: -50, // Trượt sang trái khi bị xóa
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
      duration: 0.1,
    },
  },
};

const createHeaderObjects = <TData,>(
  tableInstance: Table<TData>,
): Record<string, React.ReactNode> => {
  const headerObject: Record<string, React.ReactNode> = {};

  tableInstance.getHeaderGroups().forEach((headerGroup) => {
    headerGroup.headers.forEach((column) => {
      // Gán key là column.id và value là kết quả của flexRender
      headerObject[column.id] = flexRender(
        column.column.columnDef.header,
        column.getContext(),
      );
    });
  });

  return headerObject;
};

function DataGrid<TData>({ columnDefs, data }: DataGridProps<TData>) {
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([]);
  const tableColumns = React.useMemo(() => {
    return transformColumns(columnDefs);
  }, [columnDefs]);
  const [isOpenChooseColumnPanel, setIsOpenChooseColumnPanel] =
    React.useState(false);
  const { state, actions } = useDataGridContext();
  const [columnResizeMode, setColumnResizeMode] =
    React.useState<ColumnResizeMode>("onChange");
  const [columnResizeDirection, setColumnResizeDirection] =
    React.useState<ColumnResizeDirection>("ltr");

  const tableInstance = useReactTable({
    data,
    columns: tableColumns as ColumnDef<TData>[],
    state: {
      columnVisibility,
      columnOrder,
    },
    columnResizeMode,
    columnResizeDirection,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250, // Require 250ms press-and-hold to start drag
        tolerance: 5, // Allow slight movement during press
      },
    }),
  );

  // reorder columns after drag & drop
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
      });
    }
  }

  const contentViewportRef = React.useRef<HTMLDivElement | null>(null);

  // Initialize Virtualizer
  const rowVirtualizer = useVirtualizer({
    count: tableInstance.getRowModel().rows.length,
    estimateSize: () => 40, // Estimated row height
    getScrollElement: () => contentViewportRef.current,
    overscan: 5, // Render 5 additional rows before and after the viewport
  });

  React.useEffect(() => {
    if (tableInstance) {
      actions.initialTableInstance(tableInstance as Table<unknown>);
      setColumnOrder(
        tableInstance.getAllLeafColumns().map((column) => column.id),
      );

      actions.patchColumnHeaders(createHeaderObjects(tableInstance));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableInstance]);

  const defaultEventHandlers = useMemo(
    () => ({
      [resolveEventName(
        EVENT_NAMESPACE,
        EVENT_NAME.OPEN_PANEL_CHOOSE_COLUMN,
        state.id,
      )]: () => {
        setIsOpenChooseColumnPanel(true);
      },
      [resolveEventName(
        EVENT_NAMESPACE,
        EVENT_NAME.CLOSE_PANEL_CHOOSE_COLUMN,
        state.id,
      )]: () => {
        setIsOpenChooseColumnPanel(false);
      },
    }),
    [state.id],
  );

  useEventListeners(defaultEventHandlers, EventBusInstance);

  return (
    <div className="data-grid relative w-full p-2">
      {isOpenChooseColumnPanel && <ChooseColumnPanel />}
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <div className="grid-header-container relative">
          {tableInstance.getHeaderGroups().map((headerGroup, rowIndex) => {
            return (
              <div
                key={rowIndex}
                className="header-row flex"
                style={{ top: rowIndex * 30 }}
              >
                <SortableContext
                  items={columnOrder}
                  strategy={horizontalListSortingStrategy}
                >
                  <AnimatePresence>
                    {headerGroup.headers.map((header, rowIndex) => {
                      return (
                        <motion.div
                          key={header.id + "-" + rowIndex}
                          variants={columnVariants}
                          // initial="initial"
                          animate="animate"
                          exit="exit"
                          layout
                        >
                          <HeaderCellComp header={header} />
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </SortableContext>
              </div>
            );
          })}
        </div>
        <div
          className="content-viewport relative h-[300px] overflow-auto"
          ref={contentViewportRef}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = tableInstance.getRowModel().rows[virtualRow.index];
            return (
              <div
                key={row.id}
                data-index={virtualRow.index}
                className="row absolute flex w-full"
                style={{
                  transform: `translateY(${virtualRow.start}px)`, // Position the row using transform
                  height: `${virtualRow.size}px`, // Height of the row
                }}
              >
                {row.getVisibleCells().map((cell: Cell<TData, unknown>) => (
                  <SortableContext
                    key={cell.id}
                    items={columnOrder}
                    strategy={horizontalListSortingStrategy}
                  >
                    <AnimatePresence>
                      <motion.div
                        variants={columnVariants}
                        // initial="initial"
                        animate="animate"
                        exit="exit"
                        layout
                      >
                        <CellComponent cell={cell} />
                      </motion.div>
                    </AnimatePresence>
                  </SortableContext>
                ))}
              </div>
            );
          })}
        </div>
      </DndContext>
    </div>
  );
}

function DataGridProviderImpl<TData>(
  props: PropsWithChildren<DataGridProps<TData>>,
) {
  return (
    <DataGridProvider {...props}>
      <DataGrid {...props} />
    </DataGridProvider>
  );
}

export default DataGridProviderImpl;
