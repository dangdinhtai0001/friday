import { FieldValues } from "react-hook-form";
import { FormProvider } from "./contexts/FormProvider";
import { FormProps, FormRef } from "./types/form";
import FormController from "./FormController";
import { forwardRef, JSX } from "react";

const FormContainer = <
  FormValues extends FieldValues,
  SubmitResponse,
  ExternalContext
>(
  {
    children,
    ...props
  }: FormProps<FormValues, SubmitResponse, ExternalContext>,
  ref: React.ForwardedRef<FormRef<FormValues>>
) => {
  const { externalContext, initialFieldState, initialLayout } = props;

  return (
    <FormProvider
      externalContext={externalContext}
      initialFieldState={initialFieldState}
      initialLayout={initialLayout}
    >
      <FormController<FormValues, SubmitResponse, ExternalContext>
        {...props}
        ref={ref}
      >
        {children}
      </FormController>
    </FormProvider>
  );
};

// export default FormContainer;

export default forwardRef(FormContainer) as <
  FormValues extends FieldValues,
  SubmitResponse,
  ExternalContext
>(
  props: FormProps<FormValues, SubmitResponse, ExternalContext> & {
    ref?: React.ForwardedRef<FormRef<FormValues>>;
  }
) => JSX.Element;
