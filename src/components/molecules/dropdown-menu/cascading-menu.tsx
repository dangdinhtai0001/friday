import {
  ECDropdownMenuContent,
  ECDropdownMenuPortal,
  ECDropdownMenuSub,
  ECDropdownMenuSubTrigger,
} from ".";

interface CascadingMenuProps
  extends React.ComponentPropsWithoutRef<typeof ECDropdownMenuSub> {
  trigger: React.ReactNode | string;
  inset?: boolean;
  side?: React.ComponentProps<typeof ECDropdownMenuContent>["side"];
  sideOffset?: React.ComponentProps<typeof ECDropdownMenuContent>["sideOffset"];
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
    <ECDropdownMenuSub {...props}>
      <ECDropdownMenuSubTrigger inset={inset}>
        {trigger}
      </ECDropdownMenuSubTrigger>
      <ECDropdownMenuPortal>
        <ECDropdownMenuContent side={side} sideOffset={sideOffset}>
          {children}
        </ECDropdownMenuContent>
      </ECDropdownMenuPortal>
    </ECDropdownMenuSub>
  );
}

export default CascadingMenu;
