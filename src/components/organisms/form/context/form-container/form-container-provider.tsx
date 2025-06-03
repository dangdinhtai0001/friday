import React from 'react';
import {
  FieldControlState,
  FormContainerActions,
  FormContainerContextValue,
  FormContainerState,
  FormStatus,
  FromContainerProviderProps,
} from '../context.types';
import { FormContainerContext } from './form-container-context';

function FormContainerProvider({
  children,
}: React.PropsWithChildren<FromContainerProviderProps>) {
  const id = React.useId();

  const [state, setState] = React.useState<FormContainerState>({
    id: `__form-${id}`,
    status: 'idle',
    fieldStates: {},
  });

  const setFieldState = (
    fieldName: string,
    newState: Partial<FieldControlState>,
  ) => {
    setState((prevState) => ({
      ...prevState,
      fieldStates: {
        ...prevState.fieldStates,
        [fieldName]: {
          ...prevState.fieldStates[fieldName],
          ...newState,
        },
      },
    }));
  };

  const actions: FormContainerActions = {
    setStatus: (status: FormStatus) => {
      setState((prevState) => ({ ...prevState, status }));
    },
    setFieldState: setFieldState,
    setFieldMessage: (
      fieldName: string,
      message?: string,
      messageType?: FieldControlState['messageType'],
    ) => {
      setFieldState(fieldName, { message, messageType });
    },
    disableField: (fieldName: string) => {
      setFieldState(fieldName, { disabled: true });
    },
    enableField: (fieldName: string) => {
      setFieldState(fieldName, { disabled: false });
    },
  };

  return (
    <FormContainerContext.Provider
      value={{ state, actions } as FormContainerContextValue}
    >
      {children}
    </FormContainerContext.Provider>
  );
}

export default FormContainerProvider;
