import {
  FieldError,
  FieldValues,
  FormProvider,
  Path,
  useForm,
  UseFormProps,
} from 'react-hook-form';
import { ECGridLayout } from '../../atoms/grid-layout';
import { ECGridLayoutProps } from '@/components/atoms/grid-layout';
import React, { JSX } from 'react';
import { useFormContainerContext } from './context/form-container/form-container-context';
import { FormContainerState } from './context/context.types';
import {
  flattenErrors,
  FormEventNames,
  FormEventPayload,
  resolveEventName,
} from './helpers';
import useEventListeners, {
  EventHandler,
} from '@/composables/hooks/use-event-listeners';
import { EventBusInstance } from '@/composables/utils/EventBus';
import { cn } from '@/composables/utils/shadcn';
import { LoadingCircleSpinner } from '@/components/atoms/loader';

export type FormContainerProps<TFormValues extends FieldValues> = Omit<
  UseFormProps,
  'onSubmit'
> &
  Omit<ECGridLayoutProps, 'onSubmit'> & {
    init?: TFormValues | (() => Promise<TFormValues>); // Initial value (synchronous or asynchronous)
    onReset?: () => void; // Handler function when resetting the form
    onReady?: (state: FormContainerState) => void; // Hook triggered when the form is ready
    onBeforeSubmit?: (values: TFormValues) => boolean | Promise<boolean>; // Trigger before submission
    onSubmit?: (data: TFormValues) => unknown | Promise<unknown>; // Submit handler function now returns a response
    onAfterSubmit?: (
      values: TFormValues,
      submitResponse: unknown,
    ) => void | Promise<void>; // Trigger after submission, receives both the form data and the response
    validateFunction?: FormValidateFunction<TFormValues>; // Custom validation function
    onValueChange?: (params: OnValueChangeParams<TFormValues>) => void; // Handler function when values change
    disabledPolicy?: FormPolicy<TFormValues>;
  };

export type FormValidateFunction<TFormValues extends FieldValues> = (
  data: TFormValues,
) => Promise<ValidateResponse<TFormValues>>;

export type FormPolicy<TFormValues extends FieldValues> = (
  values: TFormValues,
) => Partial<Record<Path<TFormValues>, boolean>>;

export interface OnValueChangeParams<FormValues extends FieldValues> {
  field: string;
  value: unknown;
  values: FormValues;
}

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
    reValidateMode = 'onChange',
    validateFunction,
    onValueChange,
    disabledPolicy,
    className,
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

  const applyDisabledPolicy = () => {
    if (disabledPolicy) {
      const currentFormValues = methods.getValues();
      // Gọi hàm disabledPolicy để lấy ra trạng thái disable mong muốn cho từng trường
      const fieldDisabilities = disabledPolicy(currentFormValues);

      // Lặp qua các trường và áp dụng trạng thái disabled
      Object.entries(fieldDisabilities).forEach(([fieldName, isDisabled]) => {
        if (isDisabled) {
          // Nếu trường cần bị disabled, gọi actions.disableField
          // Ép kiểu fieldName sang Path<FormValues> vì actions.disableField mong đợi kiểu này
          actions.disableField(fieldName as Path<FormValues>);
        } else {
          // Nếu trường cần được enabled, gọi actions.enableField
          actions.enableField(fieldName as Path<FormValues>);
        }
      });
    }
  };

  const defaultEventHandlers = {
    [resolveEventName(FormEventNames.VALUE_CHANGE, state.id)]: (
      payload: FormEventPayload[FormEventNames.VALUE_CHANGE],
    ) => {
      // Trigger the `onValueChange` callback if it exists
      if (onValueChange) {
        onValueChange({
          ...payload,
          values: methods.getValues(),
        } as OnValueChangeParams<FormValues>);
      }

      applyDisabledPolicy();
    },
  } as Record<string, EventHandler>;

  useEventListeners(defaultEventHandlers, EventBusInstance);

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
          // resolvedValues = await (init as () => Promise<FormValues>)();
          resolvedValues = await init();
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

        // Step 4: call applyDisabledPolicy() when form ready
        applyDisabledPolicy();

        // Step 5: Call onReady after initialization completes
        if (onReady) {
          onReady(state);
        }
      }
    };

    // Trigger form initialization
    initializeForm();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init]);

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
    <div className="relative">
      {state.status === 'loading' && (
        <div className="rounded-8 backdrop-blur-4 absolute flex h-full w-full items-center justify-center">
          <LoadingCircleSpinner className="size-32" />
        </div>
      )}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmission)} className="">
          <ECGridLayout
            rows={rows}
            cols={cols}
            gapCol={gapCol}
            gapRow={gapRow}
            className={cn('__form-container', className)}
          >
            {children}
          </ECGridLayout>
        </form>
      </FormProvider>
    </div>
  );
}

// export default React.forwardRef(FormContainer) as ForwardedFormContainer;

export default React.forwardRef(FormContainer) as <
  FormValues extends FieldValues,
>(
  props: FormContainerProps<FormValues> & {
    ref?: React.ForwardedRef<FormRef<FormValues>>;
  },
) => JSX.Element;
