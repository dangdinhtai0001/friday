import { DataGridProps } from "./types/grid";
import useDataGrid from "./core/useDataGrid";
import { HeaderContainer } from "./ui/header";
import { ContentContainer } from "./ui/content";
import { ChooseColumnPanel } from "./ui/panel";
import DataGridProvider from "./context/DataGridProvider";
import { EventBusInstance } from "@/composables/lib/EventBus";
import useEventListeners from "@/composables/hooks/useEventListeners";
import { resolveEventName } from "@/composables/lib/utils";
import { EVENT_NAME, EVENT_NAMESPACE } from "./core/constants";
import { useDataGridContext } from "./context/DataGridContext";
import React from "react";
import { Table } from "@tanstack/react-table";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";

function DataGrid<TData>(props: DataGridProps<TData>) {
  const { columns, data } = props;
  const [isOpenChooseColumnPanel, setIsOpenChooseColumnPanel] =
    React.useState(false);
  const { state, actions } = useDataGridContext();

  const table: Table<TData> = useDataGrid<TData>({ columns, data });

  const defaultEventHandlers = {
    [resolveEventName(
      EVENT_NAMESPACE,
      EVENT_NAME.OPEN_PANEL_CHOOSE_COLUMN,
      state.id,
    )]: () => {
      setIsOpenChooseColumnPanel(true);
    },
  };

  useEventListeners(defaultEventHandlers, EventBusInstance);

  React.useEffect(() => {
    if (table) {
      actions.initialTableInstance(table as Table<unknown>);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  // reorder columns after drag & drop
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
  }

  return (
    <div className="data-grid relative w-full p-2">
      {isOpenChooseColumnPanel && <ChooseColumnPanel table={table} />}

      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        {/* Header */}
        <HeaderContainer table={table} />

        {/* Content */}
        <ContentContainer table={table} />
      </DndContext>
    </div>
  );
}

function DataGridProviderImpl<TData>(props: DataGridProps<TData>) {
  return (
    <DataGridProvider {...props}>
      <DataGrid {...props} />
    </DataGridProvider>
  );
}

export { DataGrid, DataGridProviderImpl };
