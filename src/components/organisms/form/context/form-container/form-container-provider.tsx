import React from "react";
import { FormContainerActions, FormContainerContextValue, FormContainerState, FromContainerProviderProps } from "../context.types";
import { FormContainerContext } from "./form-container-context";

function FormProvider({
  children,
}: React.PropsWithChildren<FromContainerProviderProps>) {
  const [state, setState] = React.useState<FormContainerState>();

  const actions: FormContainerActions = {};

  return (
    <FormContainerContext.Provider value={{ state, actions } as FormContainerContextValue}>
      {children}
    </FormContainerContext.Provider>
  );
}

export default FormProvider;
