import React from "react";
import { BaseItem, type SortableItemContext } from "./types.d";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconLoader } from "../icon-loader";
import { Button } from "@/components/atoms/button";

const SortableItemContext = React.createContext<SortableItemContext>({
  attributes: undefined,
  listeners: undefined,
  ref() {},
});

function SortableItem({ id, children }: React.PropsWithChildren<BaseItem>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const context = React.useMemo<SortableItemContext>(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef],
  );
  const style: React.CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <SortableItemContext.Provider value={context}>
      <div className="SortableItem" ref={setNodeRef} style={style}>
        {children}
      </div>
    </SortableItemContext.Provider>
  );
}

function DragHandle() {
  const { attributes, listeners, ref } = React.useContext(SortableItemContext);

  return (
    <Button
      className="drag-handle"
      variant="borderless"
      size="icon"
      {...attributes}
      {...listeners}
      ref={ref}
    >
      <IconLoader name="grip-vertical"  className="text-black-40"/>
    </Button>
  );
}

export { SortableItem, DragHandle };
