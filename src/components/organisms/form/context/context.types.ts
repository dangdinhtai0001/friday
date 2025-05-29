/* eslint-disable @typescript-eslint/no-empty-object-type */
export type FormContainerState = {
  formId: string;
};
export type FormContainerActions = {};

export type FormContainerContextValue = {
  state: FormContainerState;
  actions: FormContainerActions;
};

export interface FromContainerProviderProps {}

// -----

/* eslint-disable @typescript-eslint/no-empty-object-type */
export type FormFieldState = {
  id: string;
  controlId: string;
  fieldName: string
};
export type FormFieldActions = {};

export type FormFieldContextValue = {
  state: FormFieldState;
  actions: FormFieldActions;
};

export interface FormFieldProviderProps {
  name: string
}
