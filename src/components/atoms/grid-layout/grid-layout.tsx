import { cn } from '@/composables/utils/shadcn';
import { GridLayoutProps } from './types';

function hasUnitOrVar(gap: string) {
  const hasUnitOrVar =
    /(px|rem|em|%|vw|vh|vmin|vmax|ch|ex|cm|mm|in|pt|pc)|var\(.+\)/.test(gap);
  return hasUnitOrVar;
}
function GridLayout({
  cols = 6,
  rows = 6,
  gapCol = '8px',
  gapRow = '8px',
  className,
  children,
}: GridLayoutProps) {
  const style: React.CSSProperties = {};
  style['--grid-cols'] = `repeat(${cols},minmax(0,1fr))`;

  if (typeof rows === 'string') {
    // Nếu `rows` là một chuỗi (ví dụ: "min-content min-content 1fr")
    style['--grid-rows'] = rows;
  } else {
    style['--grid-rows'] = `repeat(${rows},minmax(0,auto))`;
  }

  let gapColClass = '';
  if (hasUnitOrVar(gapCol)) {
    style['--grid-gap-col'] = gapCol;
    gapColClass = 'gap-x-[var(--grid-gap-col)]';
  } else {
    gapColClass = `gap-x-${gapCol}`;
  }

  let gapRowClass = '';
  if (hasUnitOrVar(gapRow)) {
    style['--grid-gap-row'] = gapRow;
    gapRowClass = 'gap-y-[var(--grid-gap-row)]';
  } else {
    gapRowClass = `gap-y-${gapRow}`;
  }

  return (
    <div
      className={cn(
        'grid h-full w-full auto-rows-min',
        'grid-cols-[var(--grid-cols)] grid-rows-[var(--grid-rows)]',
        gapColClass,
        gapRowClass,
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}

export default GridLayout;
