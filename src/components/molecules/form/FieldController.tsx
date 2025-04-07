import React, { forwardRef, useEffect } from "react";
import { useController, FieldValues } from "react-hook-form";
import { FieldControllerProps } from "./types/field.d";
import { useFormContext } from "./contexts/FormContext";

// Main Component Implementation
const FieldController = <T extends FieldValues>(
  {
    name,
    label,
    layout = "vertical", // Default is vertical
    hint,
    hintType = "info",
    labelAlign = "right", // Default alignment is right
    labelWidth = "120px", // Default width for the label
    hintDisplayMode = "ellipsis", // Default is ellipsis
    isRequired = false,
    children,
  }: FieldControllerProps<T>,
  ref: any // Ref forwarded to the child element
) => {
  const { state, actions } = useFormContext();

  const {
    field,
    fieldState: { error },
  } = useController<T>({ name });

  // Determine the color class for the hint based on hintType
  const hintColorClass = {
    info: "text-secondary-blue",
    warning: "text-secondary-yellow",
    error: "text-secondary-red",
  }[hintType];

  // Determine the alignment class for the label
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[labelAlign];

  // Tailwind classes for the hint message
  const hintClass = {
    ellipsis: "truncate", // Truncate with ellipsis
    full: "", // No truncation
  }[hintDisplayMode];

  // Calculate the left margin for the hint message
  const marginLeftForHint =
    layout === "horizontal"
      ? `calc(${labelWidth} + 1rem)` // 1rem ~ space-x-4 (spacing between label and input)
      : undefined;

  // UseEffect to detect error changes
  useEffect(() => {
    if (error) {
      actions.patchLayout(name, { h: 3.3 + 1.5 });
    } else {
      actions.patchLayout(name, state.initialLayout[name]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, name]);

  return (
    <div key={name} data-grid={{ x: 0, y: 0, w: 12, h: 7 }}>
      {/* Main container for the label and input */}
      <div
        className={`${
          layout === "horizontal"
            ? "flex items-center space-x-4" // Horizontal layout with label and input vertically aligned
            : "flex flex-col space-y-1" // Vertical layout
        }`}
      >
        {/* Label */}
        <label
          htmlFor={name.toString()}
          className={`font-medium ${
            error ? "text-secondary-red" : "text-balck-100" // Change text color if there's an error
          } ${alignClass} pr-2 ${
            layout === "horizontal" ? "shrink-0 self-center" : "" // Add self-center for vertical alignment
          }`}
          style={{
            minWidth: labelWidth, // Use inline styles to set the width
          }}
        >
          <div className="relative inline-block">
            {isRequired && (
              <span className="absolute top-2 right-0 transform translate-x-full -translate-y-1/2 text-secondary-red">
                *
              </span>
            )}
            {label}
          </div>
        </label>

        {/* Input and Error Circle */}
        <div className="relative w-full">
          {/* Render children and pass field props */}
          {/* {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { ...field, disabled: (state.fieldState[name]?.isDisabled ?? false) });
            }
            return child;
          })} */}
          {React.Children.map(children, (child) => {
            if (React.isValidElement<Record<string, unknown>>(child)) {
              return React.cloneElement(child, {
                ...field,
                disabled: state.fieldState[name]?.isDisabled ?? false,
              });
            }
            return child;
          })}
          {/* Red circle when there's an error */}
          {error && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-secondary-red rounded-full"></div>
          )}
        </div>
      </div>

      {/* Error Message and Hint Message */}
      <div
        className="flex flex-col space-y-1"
        style={{
          marginLeft: marginLeftForHint, // Push the hint message to the left by the total spacing
        }}
      >
        {error && (
          <p
            className="text-secondary-red text-14 animate-shake"
            style={{ animationDuration: "0.5s" }}
          >
            {error.message}
          </p>
        )}

        {hint && (
          <p
            className={`text-14 ${hintColorClass} ${hintClass}`}
            title={hintDisplayMode === "ellipsis" ? hint : undefined} // Tooltip when ellipsis
          >
            {hint}
          </p>
        )}
      </div>
    </div>
  );
};

// Export with forwardRef
export default forwardRef(FieldController);
