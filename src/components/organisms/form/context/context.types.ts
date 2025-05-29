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

/**
 * Định nghĩa vị trí của label so với control.
 * - 'top': Label nằm phía trên control.
 * - 'left': Label nằm bên trái control.
 */
export type LabelPlacement = 'top' | 'left';

export type FormFieldState = {
  id: string;
  controlId: string;
  fieldName: string;
  labelPlacement?: LabelPlacement;
  hasDescription: boolean;
  hasMessage: boolean;
};
export type FormFieldActions = {
  setShowDescription: (show: boolean) => void;
  setShowMessage: (show: boolean) => void;
};

export type FormFieldContextValue = {
  state: FormFieldState;
  actions: FormFieldActions;
};

export interface FormFieldProviderProps {
  name: string;
  labelPlacement: LabelPlacement;
}
