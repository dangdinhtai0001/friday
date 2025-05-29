import React from "react";
import { FormContainerContextValue } from "../context.types";

export const FormContainerContext = React.createContext<FormContainerContextValue | undefined>(
  undefined,
);

export function useFormContainerContext() {
  const context = React.useContext(FormContainerContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context as FormContainerContextValue;
}
