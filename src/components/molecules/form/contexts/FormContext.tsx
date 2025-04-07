// src\components\molecules\form\contexts\FormContext.tsx
import React from "react";
import { FormState, FormActions } from "../types/context.d";
import { FieldState } from "../types/field.d";
import { FormLayout } from "../types/form";

// Define a generic initial state that conforms to the FormState<T> type
const createInitialState = <T,>(
  externalContext?: T,
  initialFieldState?: FieldState,
  initialLayout?: FormLayout
): FormState<T> => ({
  formId: "", // Use an empty string as a default value for formId
  status: "idle",
  submitCount: 0,
  lastSubmitStatus: null,
  isDirty: false,
  externalContext: externalContext || undefined,
  fieldState: initialFieldState || {},
  layout: initialLayout || {},
  initialLayout: initialLayout || {},
});

// Create a generic context
export const FormContext = React.createContext<
  | {
      state: FormState<unknown>;
      actions: FormActions<unknown>;
    }
  | undefined
>(undefined);

// Custom hook to use the context with a specific type T
export const useFormContext = <T,>() => {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context as { state: FormState<T>; actions: FormActions<T> };
};

// Helper function to create no-op implementations for actions
const createNoOpActions = (): FormActions<unknown> => ({
  setFormId: () => {
    console.warn("setFormId was called without a provider.");
  },
  setStatus: () => {
    console.warn("setStatus was called without a provider.");
  },
  incrementSubmitCount: () => {
    console.warn("incrementSubmitCount was called without a provider.");
  },
  setLastSubmitStatus: () => {
    console.warn("setLastSubmitStatus was called without a provider.");
  },
  markAsDirty: () => {
    console.warn("markAsDirty was called without a provider.");
  },
  resetForm: () => {
    console.warn("resetForm was called without a provider.");
  },
  setExternalContext: () => {
    console.warn("setExternalContext was called without a provider.");
  },
  patchFieldState: function (): void {
    console.warn("patchFieldState was called without a provider.");
  },
  patchLayout: function (): void {
    console.warn("patchLayout was called without a provider.");
  },
});

// Export a default context with no-op actions and initial state
export const defaultContextValue = {
  state: createInitialState<unknown>(),
  actions: createNoOpActions(),
};
