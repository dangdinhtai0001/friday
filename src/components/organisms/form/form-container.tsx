import  React from "react";
import { useForm, FieldValues, UseFormProps, FormProvider } from "react-hook-form";

export type FormContainerProps = React.HTMLAttributes<HTMLDivElement> & UseFormProps

function FormContainer<FormValues extends FieldValues>({reValidateMode, children} : FormContainerProps){

    // Initialize useForm with custom resolver and mode
    const methods = useForm<FormValues>({        mode: reValidateMode,        });

    // Handle form submission
  const handleSubmission = async (data: FormValues) => {
    console.log(data);
    
  };

    return (
        <div>
            <form onSubmit={methods.handleSubmit(handleSubmission)}>
              <FormProvider {...methods}>
      {children}
              </FormProvider>
            </form>
        </div>
    )
}

export default FormContainer;