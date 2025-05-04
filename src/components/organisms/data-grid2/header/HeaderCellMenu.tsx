import { Button } from "@/components/atoms/button";
import { IconLoader } from "@/components/atoms/icon-loader";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/organisms/dropdown-menu";
import { EventBusInstance } from "@/composables/lib/EventBus";
import translate from "@/composables/lib/international";
import { resolveEventName } from "@/composables/lib/utils";
import { EVENT_NAME, EVENT_NAMESPACE } from "../constants";
import { useDataGridContext } from "../context/DataGridContext";

function HeaderCellMenu() {
  const { state } = useDataGridContext();

  const handleSelectChooseColumn = () => {
    EventBusInstance.emit(
      resolveEventName(
        EVENT_NAMESPACE,
        EVENT_NAME.OPEN_PANEL_CHOOSE_COLUMN,
        state.id,
      ),
    );
  };

  return (
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
          <DropdownMenuItem
            className="flex items-center gap-2"
            onSelect={handleSelectChooseColumn}
          >
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
  );
}

export default HeaderCellMenu;
