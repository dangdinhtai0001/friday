// src/contexts/FormProvider.tsx
import React, { useState } from "react";
import FormContext from "./FormContext";
import { FormState, FormActions } from "../types/context.d";

interface FormProviderProps {
  children: React.ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [state, setState] = useState<FormState>({
    formId: undefined,
    status: "idle",
    submitCount: 0,
    lastSubmitStatus: null,
    isDirty: false,
  });

  const actions: FormActions = {
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
        formId: undefined,
        status: "idle",
        submitCount: 0,
        lastSubmitStatus: null,
        isDirty: false,
      });
    },
  };

  return (
    <FormContext.Provider value={{ state, actions }}>
      {children}
    </FormContext.Provider>
  );
};
