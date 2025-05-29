import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  FormContainerActions,
  FormContainerContextValue,
  FormContainerState,
  FromContainerProviderProps,
} from '../context.types';
import { FormContainerContext } from './form-container-context';

const initialState: FormContainerState = {
  formId: uuidv4(),
};

function FormContainerProvider({
  children,
}: React.PropsWithChildren<FromContainerProviderProps>) {
  const [state] = React.useState<FormContainerState>({
    ...initialState,
  });

  const actions: FormContainerActions = {};

  return (
    <FormContainerContext.Provider
      value={{ state, actions } as FormContainerContextValue}
    >
      {children}
    </FormContainerContext.Provider>
  );
}

export default FormContainerProvider;
