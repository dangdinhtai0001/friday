import { cn } from "@/composables/utils/shadcn";
import React from "react";

// Mở rộng React.CSSProperties để thêm các CSS custom properties cho grid
// Đảm bảo file src/types/types.d.ts của bạn cũng đã được cập nhật với các biến này.
declare module 'react' {
  interface CSSProperties {
    '--grid-cols'?: string;
    '--grid-rows'?: string; // Nếu bạn muốn hỗ trợ grid-rows động
    '--grid-spacing-gap'?: string;
  }
}

interface GridLayoutProps {
  children: React.ReactNode;
  /**
   * Số cột của grid.
   * - Có thể là số (ví dụ: 3 cho `grid-cols-3`).
   * - Có thể là chuỗi mô tả template (ví dụ: "1fr 2fr 1fr" hoặc "repeat(auto-fit, minmax(200px, 1fr))").
   */
  cols?: number | string;
  /**
   * Số dòng của grid (ít dùng hơn col, nhưng vẫn có thể hỗ trợ).
   * - Có thể là số (ví dụ: 2 cho `grid-rows-2`).
   * - Có thể là chuỗi mô tả template.
   */
  rows?: number | string;
  /**
   * Khoảng cách giữa các ô lưới.
   * - Nếu là chuỗi có đơn vị (ví dụ: "16px", "1.5rem"), sẽ dùng giá trị đó trực tiếp.
   * - Nếu là chuỗi không có đơn vị (ví dụ: "4", "8"), sẽ được coi là Tailwind spacing unit
   * và tương ứng với `gap-<N>` (ví dụ: "gap-4").
   * - Nếu là `undefined` hoặc `null`, không áp dụng gap.
   */
  gap?: string;
  /**
   * Cách các phần tử được căn chỉnh trên trục chính (main axis) của grid.
   * Tương ứng với Tailwind CSS: `justify-items-start`, `justify-items-end`, `justify-items-center`, `justify-items-stretch`.
   */
  justifyItems?: "start" | "end" | "center" | "stretch";
  /**
   * Cách các phần tử được căn chỉnh trên trục phụ (cross axis) của grid.
   * Tương ứng với Tailwind CSS: `align-items-start`, `align-items-end`, `align-items-center`, `align-items-stretch`, `align-items-baseline`.
   */
  alignItems?: "start" | "end" | "center" | "stretch" | "baseline";
  /**
   * Các class CSS tùy chỉnh bổ sung từ Tailwind CSS hoặc CSS thông thường.
   */
  className?: string;
}

function GridLayout({
  children,
  cols,
  rows,
  gap,
  justifyItems,
  alignItems,
  className,
}: GridLayoutProps) {
  const style: React.CSSProperties = {};
  let gapClass = "";
  let colClass = "";
  let rowClass = "";

  // Logic cho gap
  if (gap) {
    const hasUnitOrVar = /(px|rem|em|%|vw|vh|vmin|vmax|ch|ex|cm|mm|in|pt|pc)|var\(.+\)/.test(gap);
    if (hasUnitOrVar) {
      style['--grid-spacing-gap'] = gap;
      gapClass = "gap-[var(--grid-spacing-gap)]";
    } else {
      gapClass = `gap-${gap}`;
    }
  }

  // Logic cho cols
  if (cols) {
    if (typeof cols === 'number') {
      colClass = `grid-cols-${cols}`;
    } else { // string
      style['--grid-cols'] = cols;
      colClass = "grid-cols-[var(--grid-cols)]";
    }
  }

  // Logic cho rows
  if (rows) {
    if (typeof rows === 'number') {
      rowClass = `grid-rows-${rows}`;
    } else { // string
      style['--grid-rows'] = rows;
      rowClass = "grid-rows-[var(--grid-rows)]";
    }
  }

  return (
    <div
      className={cn(
        "grid",
        colClass,
        rowClass,
        justifyItems ? `justify-items-${justifyItems}` : "",
        alignItems ? `items-${alignItems}` : "",
        gapClass,
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}

export default GridLayout;