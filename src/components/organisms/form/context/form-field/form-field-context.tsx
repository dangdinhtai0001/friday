import React from 'react';
import { FormFieldContextValue } from '../context.types';

export const FormFieldContext = React.createContext<
  FormFieldContextValue | undefined
>(undefined);

export function useFormFieldContext() {
  const context = React.useContext(FormFieldContext);
  if (!context) {
    throw new Error(
      'useFormFieldContext must be used within a FormFieldProvider',
    );
  }
  return context as FormFieldContextValue;
}
