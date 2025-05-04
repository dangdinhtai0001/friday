import { defaultDropAnimationSideEffects, DragOverlay, DropAnimation } from "@dnd-kit/core";

const dropAnimationConfig: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.4"
        }
      }
    })
  };

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SortableOverlayProps {}

export function SortableOverlay({ children }: React.PropsWithChildren<SortableOverlayProps>) {
    return (
      <DragOverlay dropAnimation={dropAnimationConfig}>{children}</DragOverlay>
    );
  }