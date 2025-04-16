import { Button } from "@/components/atoms/button";
import {
  DataViewEventNames,
  type FilterContainerProps,
} from "../types.d";
import { useDataViewContext } from "../context/DataViewContext";
import { EventBusInstance } from "@/composables/lib/EventBus";
import { resolveEventName } from "../Utils";

function FilterContainer({ children }: FilterContainerProps) {
  const { state } = useDataViewContext();

  const applyFilters = () => {
    EventBusInstance.emit(
      resolveEventName(DataViewEventNames.TRIGGER_FILTER, state.id)
    );
  };

  return (
    <div className="filter-component">
      {children}
      <Button onClick={applyFilters}>Apply filters</Button>
    </div>
  );
}

export default FilterContainer;
