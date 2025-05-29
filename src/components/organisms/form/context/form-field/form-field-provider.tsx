import React from 'react';
import {
  FormFieldActions,
  FormFieldContextValue,
  FormFieldProviderProps,
  FormFieldState,
} from '../context.types';
import { FormFieldContext } from './form-field-context';

function FormFieldProvider({
  name,
  children,
}: React.PropsWithChildren<FormFieldProviderProps>) {
  const id = React.useId();
  const [state] = React.useState<FormFieldState>({
    id: id,
    controlId: `_control-${id}`,
    fieldName: name,
  });

  const actions: FormFieldActions = {};

  return (
    <FormFieldContext.Provider
      value={{ state, actions } as FormFieldContextValue}
    >
      {children}
    </FormFieldContext.Provider>
  );
}

export default FormFieldProvider;
