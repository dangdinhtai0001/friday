import React from "react";
import { Button } from "@/components/atoms/button";
import { IconLoader } from "@/components/atoms/icon-loader";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuCheckboxItem,
} from "@/components/organisms/dropdown-menu";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import translate from "@/composables/lib/international";
import { HeaderContext } from "@tanstack/react-table";

export interface HeaderCellComponentProps<TData> {
  children?: React.ReactNode;
  headerContext: HeaderContext<TData, unknown>;
}

function HeaderCellComponent<TData>({
  children,
}: HeaderCellComponentProps<TData>) {
  return (
    <>
      <div className="header-cell-comp flex items-center justify-between">
        <div className="header-cell-comp-display">{children}</div>
        <div className="header-cell-comp-menu flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="borderless" size="icon">
                <IconLoader name="dots-vertical" className="text-black-40" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="" align="start" side="bottom">
              <DropdownMenuGroup>
                <DropdownMenuItem className="flex items-center gap-2">
                  <IconLoader name="arrow-narrow-up" className="size-16" />
                  {translate("component.data-grid.header.menu.sort-ascending")}
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <IconLoader name="arrow-narrow-down" className="size-16" />
                  {translate("component.data-grid.header.menu.sort-descending")}
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="flex items-center gap-2">
                    <IconLoader name="pin" className="size-16" />
                    {translate("component.data-grid.header.menu.pin-column")}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuCheckboxItem checked={true}>
                        {translate("component.data-grid.header.menu.no-pin")}
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        {translate("component.data-grid.header.menu.pin-left")}
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        {translate("component.data-grid.header.menu.pin-right")}
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="flex items-center gap-2">
                  <IconLoader name="table-column" className="size-16" />
                  {translate("component.data-grid.header.menu.choose-column")}
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <IconLoader name="refresh" className="size-16" />
                  {translate("component.data-grid.header.menu.reset-column")}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}

export default HeaderCellComponent;
