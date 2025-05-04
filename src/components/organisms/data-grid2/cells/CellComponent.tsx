import { useSortable } from "@dnd-kit/sortable";
import { Cell, flexRender } from "@tanstack/react-table";
import { CSS } from "@dnd-kit/utilities";
import { DEFAULT_COLUMN_MIN_WIDTH } from "../constants";

interface CellComponentProps<TData> {
  cell: Cell<TData, unknown>;
}

function CellComponent<TData>({ cell }: CellComponentProps<TData>) {
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
  });

  const style: React.CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: "width transform 0.2s ease-in-out",
    width: cell.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      key={cell.id}
      className="viewport-cell border-black-5 text-black-100 typography-regular-12 flex items-center justify-start border-b-1 px-4 py-2"
      style={{
        minWidth: DEFAULT_COLUMN_MIN_WIDTH,
        ...style,
      }}
      ref={setNodeRef}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </div>
  );
}

export default CellComponent;
