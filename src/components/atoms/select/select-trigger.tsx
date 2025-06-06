import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

import { cn } from '@/composables/utils/shadcn';
import { ECIconLoader } from '../icon-loader';

function SelectTrigger({
  className,
  size = 'default',
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: 'sm' | 'default';
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        'rounded-8 border-black-10 border-[0.5px]',
        'flex w-fit items-center justify-between gap-8 px-8 py-4',
        'focus:shadow-none focus:ring-0 focus:outline-none',
        'data-[placeholder]:text-black-20',
        'typography-regular-14 bg-background-5',
        'whitespace-nowrap transition-[color,box-shadow] outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        "hover:border-black-40 hover:cursor-pointer hover:shadow-md",
        // "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ECIconLoader name="chevron-down" className="opacity-50"/>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export { SelectTrigger };
