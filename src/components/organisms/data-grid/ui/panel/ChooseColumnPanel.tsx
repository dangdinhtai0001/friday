import { DndContext, DragEndEvent, useDraggable } from "@dnd-kit/core";
import React from "react";
import { Table } from "@tanstack/react-table";
import { CheckLabel } from "@/components/molecules/check-label";
import { DragHandle, SortableList } from "@/components/atoms/dnd-sortable-list";

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
  table,
}: ChooseColumnPanelProps<TData>) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id!,
  });

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

  const visibilityState = table?.getState().columnVisibility;

  const contentPanel = React.useMemo(() => {
    return table?.getAllLeafColumns().map((column) => {
      return (
        <div key={column.id} className="flex flex-col gap-4 px-8 py-4">
          <CheckLabel
            id={column.id}
            label={column.id || "123"}
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
      <div className="panel-container rounded-8 border-black-20 bg-white-100/80 flex min-w-[200px] flex-col border-1 px-8 py-4 backdrop-blur-[40px]">
        {/* Apply draggable props to header */}
        <div
          ref={setNodeRef}
          className="panel-header typography-regular-14 border-black-5 cursor-grab border-b-[0.5px]"
          {...attributes}
          {...listeners}
        >
          Choose Column
        </div>
        <div className="panel-content max-h-[200px] gap-4 overflow-y-auto">
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

  return (
    <DndContext onDragEnd={handleDragEnd}>
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

export { ChooseColumnPanel, ChooseColumnPanelProvider };
