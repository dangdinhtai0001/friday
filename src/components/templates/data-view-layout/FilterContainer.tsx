import React from "react";

function FilterContainer({ children }: { children: React.ReactNode }) {
  return <div className="filter-component">{children}</div>;
}

export default FilterContainer;
