import React from "react";
import { DataViewLayoutProps } from "./types";
import FilterContainer from "./FilterContainer";

const DataViewLayout = ({ children }: DataViewLayoutProps) => {
  const filterChildren = React.Children.toArray(children).find((child) => {
    return React.isValidElement(child) && child.type === FilterContainer;
  });

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

export default DataViewLayout;
