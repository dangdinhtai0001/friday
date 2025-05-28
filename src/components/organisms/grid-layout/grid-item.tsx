import { cn } from "@/composables/utils/shadcn";
import React from "react";

// Mở rộng React.CSSProperties để thêm CSS custom property cho grid item
declare module 'react' {
  interface CSSProperties {
    '--col-span'?: string | number;
    '--row-span'?: string | number;
    '--col-start'?: string | number;
    '--row-start'?: string | number;
  }
}

interface GridItemProps {
  children: React.ReactNode;
  /**
   * Số cột mà item sẽ chiếm.
   * - Có thể là số (ví dụ: 2 cho `col-span-2`).
   * - Có thể là "full" cho `col-span-full`.
   * - Có thể là một chuỗi tùy chỉnh (ví dụ: "2 / 4" cho `col-span-[2_/_4]`).
   */
  span?: number | "full" | string;
  /**
   * Số dòng mà item sẽ chiếm.
   * - Có thể là số (ví dụ: 2 cho `row-span-2`).
   * - Có thể là "full" cho `row-span-full`.
   * - Có thể là một chuỗi tùy chỉnh.
   */
  rowSpan?: number | "full" | string;
  /**
   * Bắt đầu từ cột nào.
   * - Có thể là số (ví dụ: 2 cho `col-start-2`).
   * - Có thể là một chuỗi tùy chỉnh.
   */
  start?: number | string;
  /**
   * Bắt đầu từ dòng nào.
   * - Có thể là số (ví dụ: 2 cho `row-start-2`).
   * - Có thể là một chuỗi tùy chỉnh.
   */
  rowStart?: number | string;
  className?: string;
}

function GridItem({
  children,
  span,
  rowSpan,
  start,
  rowStart,
  className,
  ...props
}: GridItemProps) {
  const style: React.CSSProperties = {};
  let spanClass = "";
  let rowSpanClass = "";
  let startClass = "";
  let rowStartClass = "";

  // Logic cho span
  if (span) {
    if (typeof span === 'number' || span === 'full') {
      spanClass = `col-span-${span}`;
    } else { // string
      style['--col-span'] = span;
      spanClass = "col-span-[var(--col-span)]";
    }
  }

  // Logic cho rowSpan
  if (rowSpan) {
    if (typeof rowSpan === 'number' || rowSpan === 'full') {
      rowSpanClass = `row-span-${rowSpan}`;
    } else { // string
      style['--row-span'] = rowSpan;
      rowSpanClass = "row-span-[var(--row-span)]";
    }
  }

  // Logic cho start
  if (start) {
    if (typeof start === 'number') {
      startClass = `col-start-${start}`;
    } else { // string
      style['--col-start'] = start;
      startClass = "col-start-[var(--col-start)]";
    }
  }

  // Logic cho rowStart
  if (rowStart) {
    if (typeof rowStart === 'number') {
      rowStartClass = `row-start-${rowStart}`;
    } else { // string
      style['--row-start'] = rowStart;
      rowStartClass = "row-start-[var(--row-start)]";
    }
  }

  return (
    <div
      className={cn(
        spanClass,
        rowSpanClass,
        startClass,
        rowStartClass,
        className,
      )}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

export default GridItem;