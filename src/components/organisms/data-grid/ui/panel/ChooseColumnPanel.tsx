import { DndContext, DragEndEvent, useDraggable } from "@dnd-kit/core";
import React from "react";

interface ChooseColumnPanelProps {
  id: string;
  position: { x: number; y: number };
}

function ChooseColumnPanel({ id, position }: ChooseColumnPanelProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {};

  return (
    <DndContext>
      <div
        ref={setNodeRef}
        style={{
          position: "absolute",
          left: position.x,
          top: position.y,
          ...style,
        }}
        className="z-10 cursor-grab"
        {...attributes}
        {...listeners}
      >
        <div className="panel-container data-grid-panel rounded-8 border-black-20 flex flex-col border-1 px-8 py-4 bg-white-100/80 backdrop-blur-[40px]">
          <div className="header">Choose column</div>
          <div className="centent"> </div>
        </div>
      </div>
    </DndContext>
  );
}

function ChooseColumnPanelProvider() {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const providerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Lấy kích thước của component cha (data-grid)
    const parent = providerRef.current?.parentElement;
    if (parent) {
      const parentRect = parent.getBoundingClientRect();

      // Giả sử kích thước của panel là 200x200 (thay đổi theo thực tế)
      const panelWidth = 200;
      const panelHeight = 200;

      // Tính toán vị trí trung tâm
      const x = (parentRect.width - panelWidth) / 2;
      const y = (parentRect.height - panelHeight) / 2;

      setPosition({ x, y });
    }
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    setPosition({
      x: position.x + event.delta.x,
      y: position.y + event.delta.y,
    });
  };

  return (
    <div ref={providerRef}>
      <DndContext onDragEnd={handleDragEnd}>
        <ChooseColumnPanel id="choose-column-panel" position={position} />
      </DndContext>
    </div>
  );
}

export { ChooseColumnPanel, ChooseColumnPanelProvider };
