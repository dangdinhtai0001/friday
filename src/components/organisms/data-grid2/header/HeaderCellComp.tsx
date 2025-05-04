import { useSortable } from "@dnd-kit/sortable";
import { flexRender, Header } from "@tanstack/react-table";
import { CSS } from "@dnd-kit/utilities";
import { DEFAULT_COLUMN_MIN_WIDTH } from "../constants";
import { cn } from "@/composables/lib/utils";
import HeaderCellMenu from "./HeaderCellMenu";

interface HeaderCellCompProps<TData> {
  header: Header<TData, unknown>;
}

function HeaderCellComp<TData>({ header }: HeaderCellCompProps<TData>) {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({ id: header.column.id });

  const style: React.CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: "width transform 0.2s ease-in-out",
    whiteSpace: "nowrap",
    width: header.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  // Kiểm tra nếu header là group header
  const leafColumns = header.column.getLeafColumns();
  const isGroupHeader = leafColumns.length > 1;

  // Tính toán độ rộng
  const headerWidth = isGroupHeader
    ? leafColumns.reduce((sum, col) => sum + col.getSize(), 0)
    : header.column.getSize();

  return (
    <div
      key={header.id}
      className="header-cell border-black-20 typography-regular-12 text-black-40 w-fit border-b-1 px-4 py-2"
      style={{
        width: `${headerWidth}px`,
        minWidth: isGroupHeader
          ? DEFAULT_COLUMN_MIN_WIDTH * leafColumns.length
          : DEFAULT_COLUMN_MIN_WIDTH,
      }}
    >
      <div
        className={cn(
          "flex justify-between gap-4 px-8 py-4 text-ellipsis whitespace-nowrap",
          isDragging && "scale-110 cursor-grabbing",
        )}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <div className="header-cell-comp-display">
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </div>
        <div className="header-cell-comp-menu flex items-center">
          <HeaderCellMenu />
        </div>
        {/* {!isGroupHeader && (
          <div
            {...attributes}
            {...listeners}
            className={isDragging ? "cursor-grabbing" : "cursor-grab"}
          >
            🟰
          </div>
        )} */}
      </div>
    </div>
  );
}

export default HeaderCellComp;
