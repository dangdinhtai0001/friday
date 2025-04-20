import { useDataViewContext } from "../context/DataViewContext";
import { ActionContainerProps } from "../types";

function ActionContainer({ children }: ActionContainerProps) {
    const { state } = useDataViewContext();
    
  return <div className="action-container">{children}</div>;
}

export default ActionContainer;
