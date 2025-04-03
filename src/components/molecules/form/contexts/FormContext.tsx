import React from 'react';
import { FormState, FormActions } from '../types/context.d';

// Create a context with default values
const initialState: FormState = {
  formId:undefined,
  status: "idle",
  submitCount: 0,
  lastSubmitStatus: null,
  isDirty: false,
};

const FormContext = React.createContext<{
  state: FormState;
  actions: FormActions;
}>({
  state: initialState,
  actions: {
    setFormId: () => {},
    setStatus: () => {},
    incrementSubmitCount: () => {},
    setLastSubmitStatus: () => {},
    markAsDirty: () => {},
    resetForm: () => {},
  },
});

export default FormContext;