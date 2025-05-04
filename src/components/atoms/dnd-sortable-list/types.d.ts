import type { UniqueIdentifier } from "@dnd-kit/core";
import { type DraggableAttributes } from "@dnd-kit/core";

export interface BaseItem {
  id: UniqueIdentifier;
}

export interface SortableListProps<T extends BaseItem> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  onChange: (items: T[]) => void;
}

export interface SortableItemContext {
  attributes?: DraggableAttributes;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}
