import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useDraggable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React from "react";
import { Table } from "@tanstack/react-table";
import { CheckLabel } from "@/components/molecules/check-label";
import { useDataGridContext } from "../context/DataGridContext";
import translate from "@/composables/lib/international";
import { cn, resolveEventName } from "@/composables/lib/utils";
import { Button } from "@/components/atoms/button";
import { IconLoader } from "@/components/atoms/icon-loader";
import { EventBusInstance } from "@/composables/lib/EventBus";
import { EVENT_NAME, EVENT_NAMESPACE } from "../constants";

interface Position {
  x: number;
  y: number;
}

interface ChooseColumnPanelProps<TData> {
  id?: string;
  position?: Position;
  table?: Table<TData>;
}

const PANEL_WIDTH = 200;
const PANEL_HEIGHT = 200;

function ChooseColumnPanel<TData>({
  id,
  position,
}: ChooseColumnPanelProps<TData>) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id!,
  });
  const { state } = useDataGridContext();

  const style = React.useMemo(
    () => ({
      position: "absolute",
      left: position!.x,
      top: position!.y,
      transform: transform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : undefined,
    }),
    [position, transform],
  );

  const visibilityState = state.tableInstance!.getState().columnVisibility;

  const handleClickClose = () => {
    EventBusInstance.emit(
      resolveEventName(
        EVENT_NAMESPACE,
        EVENT_NAME.CLOSE_PANEL_CHOOSE_COLUMN,
        state.id,
      ),
    );
  };

  const contentPanel = React.useMemo(() => {
    return state.tableInstance!.getAllLeafColumns().map((column) => {
      return (
        <div key={column.id} className="flex flex-col gap-4 px-8 py-4">
          <CheckLabel
            id={column.id}
            label={state.columnHeaders?.[column.id]}
            checked={column.getIsVisible()}
            animation={false}
            onCheckedChange={(checked) => {
              if (checked === "indeterminate") return;
              column.toggleVisibility(checked);
            }}
          />
        </div>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibilityState]);

  return (
    <div
      style={style as React.CSSProperties}
      className="choose-column-panel z-10"
    >
      <div className="panel-container rounded-8 border-black-20 bg-white-100/80 flex min-w-[200px] flex-col border-1 backdrop-blur-[40px]">
        {/* Apply draggable props to header */}
        <div
          ref={setNodeRef}
          className={cn(
            "panel-header border-black-10 cursor-grab border-b-[1px]",
            "flex items-center justify-between gap-4 px-8 py-8",
          )}
          {...attributes}
          {...listeners}
        >
          <div className="typography-regular-14 text-black-100 round-8">
            {translate("component.data-grid.plugin.choose-column-panel-header")}
          </div>
          <div>
            <Button
              variant="borderless"
              size="icon"
              onClick={handleClickClose}
            >
              <IconLoader name="x" />
            </Button>
          </div>
        </div>
        <div className="panel-content max-h-[200px] gap-4 overflow-y-auto px-8 py-4">
          {contentPanel}
        </div>
      </div>
    </div>
  );
}

function ChooseColumnPanelProvider<TData>(
  props: ChooseColumnPanelProps<TData>,
) {
  const [position, setPosition] = React.useState<Position>({ x: 0, y: 0 });
  const panelRef = React.useRef<HTMLDivElement>(null);
  const parentRef = React.useRef<HTMLElement | null>(null);
  const [parentSize, setParentSize] = React.useState({ width: 0, height: 0 });

  const handleDragEnd = ({ delta }: DragEndEvent) => {
    setPosition((prev) => ({
      x: prev.x + delta.x,
      y: prev.y + delta.y,
    }));
  };

  // Parent size observer
  React.useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setParentSize({ width, height });
      }
    });

    if (parentRef.current) {
      observer.observe(parentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Panel size observer
  React.useEffect(() => {
    if (!panelRef.current) return;

    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        const newX = (parentSize.width - width) / 2;
        const newY = (parentSize.height - height) / 2;
        setPosition({ x: newX, y: newY });
      }
    });

    observer.observe(panelRef.current);
    return () => observer.disconnect();
  }, [parentSize]);

  // Initial position setup
  React.useEffect(() => {
    const parent = parentRef.current;
    if (!parent) return;

    const { width, height } = parent.getBoundingClientRect();
    const x = (width - PANEL_WIDTH) / 2;
    const y = (height - PANEL_HEIGHT) / 2;
    setPosition({ x, y });
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100, // Delay 100ms
        tolerance: 5, // Di chuyển tối thiểu 5px (tùy chọn)
      },
    }),
  );

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <div
        ref={(el) => {
          parentRef.current = el?.parentElement || null;
        }}
      >
        <ChooseColumnPanel
          {...props}
          id="choose-column-panel"
          position={position}
        />
      </div>
    </DndContext>
  );
}

export default ChooseColumnPanelProvider;
