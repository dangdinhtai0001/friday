import React, { forwardRef, useImperativeHandle } from "react";
import { DataViewCommands, DataViewLayoutProps } from "./types";
import FilterContainer from "./FilterContainer";
import { useDataViewContext } from "./context/DataViewContext";

const DataViewLayout = (
  { children }: DataViewLayoutProps,
  ref: React.ForwardedRef<DataViewCommands>
) => {

  const { state } = useDataViewContext()

  const filterChildren = React.Children.toArray(children).find((child) => {
    return React.isValidElement(child) && child.type === FilterContainer;
  });

  useImperativeHandle(ref, () => ({
    getId: () => state.id || "",
  }));

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
