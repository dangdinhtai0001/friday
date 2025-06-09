import { ECButton } from '@/components/atoms/button';
import { ECIconLoader } from '@/components/atoms/icon-loader';
import {
  ECDropdownMenu,
  ECDropdownMenuCascadingMenu,
  ECDropdownMenuContent,
  ECDropdownMenuGroup,
  ECDropdownMenuItem,
  ECDropdownMenuPortal,
  ECDropdownMenuSeparator,
  ECDropdownMenuSub,
  ECDropdownMenuSubContent,
  ECDropdownMenuSubTrigger,
  ECDropdownMenuTrigger,
} from '@/components/molecules/dropdown-menu';
import { CustomHeaderProps } from 'ag-grid-react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PrimaryHeaderProps extends CustomHeaderProps {}

function PrimaryHeader({ displayName }: PrimaryHeaderProps) {
  return (
    <div className="flex h-full w-full items-center justify-between gap-4">
      <div>{displayName}</div>
      {/* ------- Dropdown Menu ------- */}
      <div>
        <ECDropdownMenu>
          <ECDropdownMenuTrigger asChild>
            <ECButton
              variant="borderless"
              leftIcon={<ECIconLoader name="dots-vertical" />}
            />
          </ECDropdownMenuTrigger>
          <ECDropdownMenuContent
            className="bg-background-2 rounded-8 w-[12rem] text-black-100 "
            sideOffset={14}
          >
            {/* --- sort group --- */}
            <ECDropdownMenuGroup>
              <ECDropdownMenuItem className='typography-regular-12'> Sort asc </ECDropdownMenuItem>
              <ECDropdownMenuItem className='typography-regular-12'> Sort desc </ECDropdownMenuItem>
            </ECDropdownMenuGroup>
            {/* --- sort group --- */}
            <ECDropdownMenuSeparator />
            {/* --- pin group --- */}
            <ECDropdownMenuGroup>
              <ECDropdownMenuSub>
                <ECDropdownMenuSubTrigger className='typography-regular-12'>Pin column</ECDropdownMenuSubTrigger>
                <ECDropdownMenuPortal>
                  <ECDropdownMenuSubContent className="bg-background-2 rounded-8 w-[12rem] text-black-100 " sideOffset={14}>
                    <ECDropdownMenuItem className='typography-regular-12'>No pin</ECDropdownMenuItem>
                    <ECDropdownMenuItem className='typography-regular-12'>Pin left</ECDropdownMenuItem>
                    <ECDropdownMenuItem className='typography-regular-12'>Pin right</ECDropdownMenuItem>
                  </ECDropdownMenuSubContent>
                </ECDropdownMenuPortal>
              </ECDropdownMenuSub>
            </ECDropdownMenuGroup>
            {/* --- pin group --- */}
            <ECDropdownMenuSeparator />
            {/* --- autosize group --- */}
            <ECDropdownMenuGroup>
              <ECDropdownMenuItem className='typography-regular-12'> Auto size this column </ECDropdownMenuItem>
              <ECDropdownMenuItem className='typography-regular-12'> Auto size all columns </ECDropdownMenuItem>
            </ECDropdownMenuGroup>
            {/* --- autosize group --- */}
            <ECDropdownMenuSeparator />
            {/* --- choose column group --- */}
            <ECDropdownMenuGroup>
              <ECDropdownMenuItem className='typography-regular-12'> Choose columns </ECDropdownMenuItem>
              <ECDropdownMenuItem className='typography-regular-12'> Reset column </ECDropdownMenuItem>
            </ECDropdownMenuGroup>
            {/* --- choose column group --- */}
          </ECDropdownMenuContent>
        </ECDropdownMenu>
      </div>
    </div>
  );
}

export default PrimaryHeader;
