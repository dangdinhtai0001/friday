import { ReactElement, isValidElement } from "react";
import { ActionContainerProps, ActionTriggerProps } from "../types";
import { FlexibleLayout } from "@/components/molecules/flexible-layout";
import ButtonTrigger from "./ButtonTrigger";
import CustomTrigger from "./CustomTrigger";
import DialogTrigger from "./DialogTrigger";
import FormTrigger from "./FormTrigger";

// List of allowed components
const allowedComponents = [
  ButtonTrigger,
  CustomTrigger,
  DialogTrigger,
  FormTrigger,
];

function ActionContainer({ children }: ActionContainerProps) {
  // Type guard to check if a child belongs to the specified components
  const isAllowedTrigger = (child: ReactElement): boolean => {
    if (!isValidElement(child)) return false;

    // Check if child.type is in the list of allowed components
    return allowedComponents.includes(
      child.type as (typeof allowedComponents)[number],
    );
  };

  // Function to render children based on type checks
  const renderChildren = () => {
    if (!children) return null;

    if (Array.isArray(children)) {
      return children
        .filter(
          (child): child is ReactElement =>
            isValidElement(child) && isAllowedTrigger(child),
        )
        .map((child, index) => {
          // Extract data-grid from child props
          const props = child.props as ActionTriggerProps;
          const dataGrid = props["data-grid"];

          return (
            <div
              key={index}
              {...(dataGrid ? { "data-grid": dataGrid } : {})}
              className=""
            >
              {child}
            </div>
          );
        });
    }

    return isValidElement(children) && isAllowedTrigger(children) ? (
      <div>{children}</div>
    ) : null;
  };

  return (
    <div className="action-container">
      <FlexibleLayout
        rowHeight={10}
        isDraggable={false}
        margin={[10, 10]}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      >
        {renderChildren()}
      </FlexibleLayout>
    </div>
  );
}

export default ActionContainer;
