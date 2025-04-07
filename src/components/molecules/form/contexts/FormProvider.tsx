// src\components\molecules\form\contexts\FormProvider.tsx
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FormContext } from "./FormContext";
import { FormState, FormActions } from "../types/context.d";
import { FieldState } from "../types/field.d";
import { FormLayout } from "../types/form";

interface FormProviderProps<T = unknown> {
  children: React.ReactNode;
  externalContext?: T;
  initialFieldState?: FieldState;
  initialLayout?: FormLayout;
}

export const FormProvider = <T,>({
  children,
  externalContext,
  initialFieldState,
  initialLayout,
}: FormProviderProps<T>) => {
  // Initialize state with default values
  const [state, setState] = useState<FormState>({
    formId: uuidv4(),
    status: "idle",
    submitCount: 0,
    lastSubmitStatus: null,
    isDirty: false,
    externalContext: externalContext || null,
    fieldState: initialFieldState || {},
    layout: initialLayout || {},
    initialLayout: initialLayout || {},
  });

  // Define actions for the context
  const actions: FormActions<T> = {
    setFormId: (id: string) => {
      setState((prevState) => ({ ...prevState, formId: id }));
    },
    setStatus: (status: "idle" | "loading") => {
      setState((prevState) => ({ ...prevState, status }));
    },
    incrementSubmitCount: () => {
      setState((prevState) => ({
        ...prevState,
        submitCount: prevState.submitCount + 1,
      }));
    },
    setLastSubmitStatus: (status: "success" | "failure" | null) => {
      setState((prevState) => ({ ...prevState, lastSubmitStatus: status }));
    },
    markAsDirty: () => {
      setState((prevState) => ({ ...prevState, isDirty: true }));
    },
    resetForm: () => {
      setState({
        formId: uuidv4(),
        status: "idle",
        submitCount: 0,
        lastSubmitStatus: null,
        isDirty: false,
        externalContext: externalContext || null, // Reset with default value
        fieldState: initialFieldState || {}, // Reset fieldState to initial value
        layout: initialLayout || {},
        initialLayout: initialLayout || {},
      });
    },
    setExternalContext: (context?: T) => {
      setState((prevState) => ({ ...prevState, externalContext: context }));
    },
    patchFieldState: (
      fieldName: string,
      updates: Partial<FieldState[string]>
    ) => {
      setState((prevState) => ({
        ...prevState,
        fieldState: {
          ...prevState.fieldState,
          [fieldName]: { ...prevState.fieldState[fieldName], ...updates },
        },
      }));
    },
    patchLayout: (fieldName: string, updates: Partial<FieldState[string]>) => {
      setState((prevState) => ({
        ...prevState,
        layout: {
          ...prevState.layout,
          [fieldName]: { ...prevState.layout[fieldName], ...updates },
        },
      }));
    },
  };

  return (
    <FormContext.Provider
      value={
        { state, actions } as {
          state: FormState<unknown>;
          actions: FormActions<unknown>;
        }
      }
    >
      {children}
    </FormContext.Provider>
  );
};
