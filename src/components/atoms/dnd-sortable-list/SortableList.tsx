import React from "react";
import { BaseItem, SortableListProps } from "./types";
import {
  Active,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { DragHandle, SortableItem, SortableOverlay } from ".";

function SortableList<T extends BaseItem>({
  items,
  renderItem,
  onChange,
}: SortableListProps<T>) {
  const [active, setActive] = React.useState<Active | null>(null);
  const activeItem = React.useMemo(
    () => items.find((item) => item.id === active?.id),
    [active, items],
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active);
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(({ id }) => id === active.id);
          const overIndex = items.findIndex(({ id }) => id === over.id);

          onChange(arrayMove(items, activeIndex, overIndex));
        }
        setActive(null);
      }}
      onDragCancel={() => {
        setActive(null);
      }}
    >
      <SortableContext items={items}>
        {items.map((item) => {
          return (
            <SortableItem key={item.id} id={item.id}>
              {renderItem(item)}
            </SortableItem>
          );
        })}
      </SortableContext>
      <SortableOverlay>
        {activeItem ? renderItem(activeItem) : null}
      </SortableOverlay>
    </DndContext>
  );
}

export default SortableList;
