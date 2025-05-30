import {
  FieldError,
  FieldValues,
  FormProvider,
  Path,
  useForm,
  UseFormProps,
} from 'react-hook-form';
import { ECGridLayout } from '../../atoms/grid-layout';
import { GridLayoutProps } from '@/components/atoms/grid-layout';
import React from 'react';
import { useFormContainerContext } from './context/form-container/form-container-context';
import { FormContainerState } from './context/context.types';
import { flattenErrors } from './helpers';

export type FormContainerProps<FormValues extends FieldValues> = UseFormProps &
  GridLayoutProps & {
    init?: FormValues | (() => Promise<FormValues>); // Initial value (synchronous or asynchronous)
    onReset?: () => void; // Handler function when resetting the form
    onReady?: (state: FormContainerState) => void; // Hook triggered when the form is ready
    onBeforeSubmit?: (values: FormValues) => boolean | Promise<boolean>; // Trigger before submission
    onSubmit?: (data: FormValues) => unknown | Promise<unknown>; // Submit handler function now returns a response
    onAfterSubmit?: (
      values: FormValues,
      submitResponse: unknown,
    ) => void | Promise<void>; // Trigger after submission, receives both the form data and the response
    validateFunction?: (
      data: FormValues,
    ) => Promise<ValidateResponse<FormValues>>; // Custom validation function
  };

export type ValidateResponse<T extends FieldValues> = {
  values: T;
  errors: Record<string, { message: string }>;
};

export interface FormRef<T extends FieldValues> {
  resetForm: () => void;
  setFormValue: <K extends Path<T>>(name: K, value: T[K]) => void;
  submitForm: () => Promise<void>;
  setFormLoading: (loading: boolean) => void;
  getFormValue: () => Partial<T>;
  validateForm: () => Promise<boolean>;
  getFieldsError: () => Record<string, FieldError | undefined>;
}

function FormContainer<FormValues extends FieldValues>(
  {
    children,
    rows,
    cols = 1,
    gapRow = '8px',
    gapCol = '8px',
    init,
    onReady,
    onReset,
    onBeforeSubmit,
    onSubmit,
    onAfterSubmit,
    reValidateMode="onChange",
    validateFunction,
  }: FormContainerProps<FormValues>,
  ref: React.ForwardedRef<FormRef<FormValues>>,
) {
  const methods = useForm<FormValues>({
    mode: reValidateMode,
    resolver: validateFunction
      ? async (data) => {
          const result = await validateFunction(data);
          return {
            values: result.values,
            errors: result.errors,
          };
        }
      : undefined,
  });
  const { state, actions } = useFormContainerContext();

  // Handle form submission
  const handleSubmission = async (data: FormValues) => {
    actions.setStatus('loading');

    // Step 1: Call beforeSubmit to check if submission should proceed
    if (onBeforeSubmit) {
      const shouldProceed = await onBeforeSubmit(data);
      if (shouldProceed === false) {
        actions.setStatus('idle');
        return;
      }
    }
    // Step 2: Call onSubmit and capture the response
    let response: unknown | undefined;
    try {
      response = await onSubmit?.(data);
    } catch (error) {
      console.error('Error during submission:', error);
      actions.setStatus('idle');
      return;
    }
    // Step 3: Call afterSubmit with both data and response
    if (onAfterSubmit) {
      await onAfterSubmit(data, response);
    }

    actions.setStatus('idle');
  };

  // Initialize form values
  React.useEffect(() => {
    const initializeForm = async () => {
      try {
        // Step 1: Handle initialization (synchronous or asynchronous)
        let resolvedValues: FormValues | undefined;
        if (typeof init === 'function') {
          actions.setStatus('loading');
          resolvedValues = await (init as () => Promise<FormValues>)();
        } else if (init) {
          resolvedValues = init;
        }
        // Step 2: Reset the form with the resolved values
        if (resolvedValues) {
          methods.reset(resolvedValues);
        }
      } catch (error) {
        console.error('Failed to initialize form:', error);
      } finally {
        // Step 3: Ensure loading state is reset
        actions.setStatus('idle');
        // Step 4: Call onReady after initialization completes
        if (onReady) {
          onReady(state);
        }
      }
    };

    // Trigger form initialization
    initializeForm();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Expose methods through ref
  React.useImperativeHandle(ref, () => ({
    resetForm: () => {
      methods.reset();
      if (onReset) {
        onReset();
      }
    },
    setFormValue: <K extends Path<FormValues>>(name: K, value: FormValues[K]) =>
      methods.setValue(name, value),
    submitForm: async () => {
      actions.setStatus('loading');

      const isValid = await methods.trigger();
      if (!isValid) {
        actions.setStatus('idle');
        return;
      }

      await methods.handleSubmit(handleSubmission)();
      actions.setStatus('idle');
    },
    setFormLoading: (loading: boolean) =>
      actions.setStatus(loading ? 'loading' : 'idle'),
    getFormValue: () => methods.getValues(),
    validateForm: async () => await methods.trigger(),
    getFieldsError: () => flattenErrors(methods.formState.errors),
  }));

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmission)}>
        <ECGridLayout rows={rows} cols={cols} gapCol={gapCol} gapRow={gapRow}>
          {children}
        </ECGridLayout>
      </form>
    </FormProvider>
  );
}

export default React.forwardRef(FormContainer);
