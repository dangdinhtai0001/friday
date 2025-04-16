import { Button } from "@/components/atoms/button";
import { type FilterContainerProps } from "./types";
import { useDataViewContext } from "./context/DataViewContext";

function FilterContainer({ children }: FilterContainerProps) {
  const { state } = useDataViewContext()

  return (
    <div className="filter-component">
      {children}
      <Button onClick={() => console.log("clicked", state.id)}>Click me</Button>
    </div>
  )
}

export default FilterContainer;
