import React, { forwardRef, useImperativeHandle } from "react";
import {
  DataViewCommands,
  DataViewEventNames,
  DataViewLayoutProps,
} from "./types.d";
import FilterContainer from "./containers/FilterContainer";
import { useDataViewContext } from "./context/DataViewContext";
import { EventBusInstance } from "@/composables/lib/EventBus";
import { resolveEventName } from "./Utils";
import useEventListeners from "@/composables/hooks/useEventListeners";
import ActionContainer from "./containers/ActionContainer";

const DataViewLayout = (
  { children, additionalEventBindings }: DataViewLayoutProps,
  ref: React.ForwardedRef<DataViewCommands>
) => {
  const { state } = useDataViewContext();

  const filterChildren = React.Children.toArray(children).find((child) => {
    return React.isValidElement(child) && child.type === FilterContainer;
  });

  const actionChildren = React.Children.toArray(children).find((child) => {
    return React.isValidElement(child) && child.type === ActionContainer;
  });

  useImperativeHandle(ref, () => ({
    getId: () => state.id || "",
  }));

  // Default event handler
  const handleOnTriggerFilter = () => {
    console.log("trigger filter", state.filters);
  };

  // Resolve the event name dynamically
  const triggerFilterEvent = resolveEventName(
    DataViewEventNames.TRIGGER_FILTER,
    state.id
  );

  // Default event handlers
  const defaultEventHandlers = {
    [triggerFilterEvent]: handleOnTriggerFilter,
  };

  // Preprocess additionalEventBindings to resolve event names with state.id
  const resolvedAdditionalEventBindings = additionalEventBindings
    ? Object.entries(additionalEventBindings).reduce(
        (acc, [eventName, handler]) => {
          const resolvedEventName = resolveEventName(eventName, state.id);
          acc[resolvedEventName] = handler;
          return acc;
        },
        {} as Record<string, () => void>
      )
    : {};

  // Merge default event handlers with prop-provided event handlers
  const mergedEventHandlers = {
    ...defaultEventHandlers,
    ...resolvedAdditionalEventBindings,
  };

  // Use the custom hook to manage event subscriptions
  useEventListeners(mergedEventHandlers, EventBusInstance);

  return (
    <div className="flex flex-col ">
      {/* Filter container ------------------------------------------------ */}
      {filterChildren ? (
        React.cloneElement(filterChildren as React.ReactElement)
      ) : (
        <div>Filter container requires a FilterComponent.</div>
      )}
      {/* Action container ------------------------------------------------ */}
      {actionChildren ? (
        React.cloneElement(actionChildren as React.ReactElement)
      ) : (
        <div>Action container requires a ActionComponent.</div>
      )}
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
