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
  const [state, setState] = React.useState<FormFieldState>({
    id: `__${name}-${id}`,
    controlId: `__control-${id}`,
    fieldName: name,
    hasDescription: false,
    hasMessage: false,
  });

  const actions: FormFieldActions = {
    setShowDescription: (show: boolean) => {
      setState((prevState) => ({ ...prevState, hasDescription: show }));
    },
    setShowMessage: (show: boolean) => {
      setState((prevState) => ({ ...prevState, hasMessage: show }));
    },
  };

  return (
    <FormFieldContext.Provider
      value={{ state, actions } as FormFieldContextValue}
    >
      {children}
    </FormFieldContext.Provider>
  );
}

export default FormFieldProvider;
