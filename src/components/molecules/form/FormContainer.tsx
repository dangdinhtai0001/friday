import { FieldValues } from "react-hook-form";
import { FormProvider } from "./contexts/FormProvider";
import { FormProps, FormRef } from "./types/form";
import FormController from "./FormController";
import { forwardRef, JSX } from "react";

const FormContainer = <T extends FieldValues>(
  { children, ...props }: FormProps<T>,
  ref: React.ForwardedRef<FormRef<T>>
) => {
  return (
    <FormProvider>
      <FormController<T> {...props} ref={ref}>
        {children}
      </FormController>
    </FormProvider>
  );
};

// export default FormContainer;

export default forwardRef(FormContainer) as <T extends FieldValues>(
  props: FormProps<T> & { ref?: React.ForwardedRef<FormRef<T>> }
) => JSX.Element;
