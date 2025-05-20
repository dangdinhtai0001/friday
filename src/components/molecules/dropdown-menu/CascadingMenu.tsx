import {
  MCDropdownMenuContent,
  MCDropdownMenuPortal,
  MCDropdownMenuSub,
  MCDropdownMenuSubTrigger,
} from ".";

interface CascadingMenuProps
  extends React.ComponentPropsWithoutRef<typeof MCDropdownMenuSub> {
  trigger: React.ReactNode | string;
  inset?: boolean;
  side?: React.ComponentProps<typeof MCDropdownMenuContent>["side"];
  sideOffset?: React.ComponentProps<typeof MCDropdownMenuContent>["sideOffset"];
}

function CascadingMenu({
  children,
  inset,
  trigger,
  side = "right",
  sideOffset = 8,
  ...props
}: React.PropsWithChildren<CascadingMenuProps>) {
  return (
    <MCDropdownMenuSub {...props}>
      <MCDropdownMenuSubTrigger inset={inset}>
        {trigger}
      </MCDropdownMenuSubTrigger>
      <MCDropdownMenuPortal>
        <MCDropdownMenuContent side={side} sideOffset={sideOffset}>
          {children}
        </MCDropdownMenuContent>
      </MCDropdownMenuPortal>
    </MCDropdownMenuSub>
  );
}

export default CascadingMenu;
