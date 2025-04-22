import { ReactElement, isValidElement } from "react";
import { useDataViewContext } from "../context/DataViewContext";
import { ActionContainerProps } from "../types";
import ActionTrigger from "./ActionTrigger";
import { FlexibleLayout } from "@/components/molecules/flexible-layout";

function ActionContainer({ children }: ActionContainerProps) {
  const { state } = useDataViewContext();

  // Type guard to check if a child is an ActionTrigger component
  const isActionTrigger = (child: ReactElement): boolean => {
    if (!isValidElement(child)) return false;

    // Check if the child's type matches the ActionTrigger component
    if (child.type === ActionTrigger) return true;

    // Handle functional components with displayName
    const childType = child.type as unknown;
    if (
      typeof childType === "function" &&
      "displayName" in (childType as object) &&
      (childType as { displayName?: string }).displayName === "ActionTrigger"
    ) {
      return true;
    }

    return false;
  };

  // Function to render children based on type checks
  const renderChildren = () => {
    if (!children) return null;

    if (Array.isArray(children)) {
      return children
        .filter((child): child is ReactElement => isValidElement(child) && isActionTrigger(child))
        .map((child, index) => <div key={index}>{child}</div>);
    }

    return isValidElement(children) && isActionTrigger(children) ? (
      <div>{children}</div>
    ) : null;
  };

  return (
    <div className="action-container">
      <FlexibleLayout rowHeight={10} isDraggable={false}>
        {renderChildren()}
      </FlexibleLayout>
    </div>
  );
}

export default ActionContainer;