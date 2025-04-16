import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import {
  DataViewCommands,
  DataViewEventNames,
  DataViewLayoutProps,
} from "./types.d";
import FilterContainer from "./containers/FilterContainer";
import { useDataViewContext } from "./context/DataViewContext";
import { EventBusInstance } from "@/composables/lib/EventBus";
import { resolveEventName } from "./Utils";

const DataViewLayout = (
  { children }: DataViewLayoutProps,
  ref: React.ForwardedRef<DataViewCommands>
) => {
  const { state } = useDataViewContext();

  const filterChildren = React.Children.toArray(children).find((child) => {
    return React.isValidElement(child) && child.type === FilterContainer;
  });

  useImperativeHandle(ref, () => ({
    getId: () => state.id || "",
  }));

  // Register the event listener when the component mounts
  useEffect(() => {
    const handleOnTriggerFilter = () => {
      console.log("trigger filter", state.filters);
    };

    const triggerFilterEvent = resolveEventName(
      DataViewEventNames.TRIGGER_FILTER,
      state.id
    );

    EventBusInstance.on(triggerFilterEvent, handleOnTriggerFilter);

    // Unsubscribe from the event when the component unmounts
    return () => {
      EventBusInstance.off(triggerFilterEvent, handleOnTriggerFilter);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col">
      {/* Filter container ------------------------------------------------ */}
      {filterChildren ? (
        React.cloneElement(filterChildren as React.ReactElement)
      ) : (
        <div>Filter container requires a FilterComponent.</div>
      )}
      {/* Action container ------------------------------------------------ */}
      <div className="action-container">Action container</div>
      {/* Data container ------------------------------------------------ */}
      <div className="data-container">Data container</div>
      {/* Pagination container ------------------------------------------------ */}
      <div className="pagination-container">Data container</div>
    </div>
  );
};

export default forwardRef(DataViewLayout) as <DataViewLayoutProps>(
  props: DataViewLayoutProps & { ref?: React.ForwardedRef<DataViewCommands> }
) => React.ReactNode;
