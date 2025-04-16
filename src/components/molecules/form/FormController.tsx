import { forwardRef, useImperativeHandle, useEffect, JSX } from "react";
import { useForm, FormProvider, Path } from "react-hook-form";
import { LoadingOverlay } from "@/components/molecules/loading-overlay";
import type { FieldValues } from "react-hook-form";
import { flattenErrors, resolveEventName } from "./utils";
import { FormProps, FormRef, OnValueChangePayload } from "./types/form.d";
import { useFormContext } from "./contexts/FormContext";
import { FlexibleLayout } from "@/components/molecules/flexible-layout";
import React from "react";
import FieldController from "./FieldController";
import { FieldControllerProps } from "./types/field";
import { EventBusInstance } from "@/composables/lib/EventBus";
import { FormEventNames, FormEventPayload } from "./FormEvents";

const FormController = <
  FormValues extends FieldValues,
  SubmitResponse,
  ExternalContext
>(
  {
    children,
    onSubmit,
    validateFunction,
    init,
    onValueChange,
    beforeSubmit,
    validationMode = "onSubmit",
    onReset,
    afterSubmit,
    onReady,
    resolveFieldDisability,
  }: FormProps<FormValues, SubmitResponse, ExternalContext>,
  ref: React.ForwardedRef<FormRef<FormValues>>
) => {
  const { state, actions } = useFormContext<ExternalContext>();

  // Initialize useForm with custom resolver and mode
  const methods = useForm<FormValues>({
    mode: validationMode,
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

  const {
    handleSubmit,
    reset,
    setValue,
    getValues,
    trigger,
    formState,
    watch,
  } = methods;

  const values = watch();

  // Initialize form values
  useEffect(() => {
    const initializeForm = async () => {
      try {
        // Step 1: Handle initialization (synchronous or asynchronous)
        let resolvedValues: FormValues | undefined;
        if (typeof init === "function") {
          actions.setStatus("loading");
          resolvedValues = await (init as () => Promise<FormValues>)();
        } else if (init) {
          resolvedValues = init;
        }

        // Step 2: Reset the form with the resolved values
        if (resolvedValues) {
          reset(resolvedValues);
        }
      } catch (error) {
        console.error("Failed to initialize form:", error);
      } finally {
        // Step 3: Ensure loading state is reset
        actions.setStatus("idle");

        // Step 4: Call onReady after initialization completes
        if (onReady) {
          onReady(state, actions);
        }
      }
    };

    // Trigger form initialization
    initializeForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init, reset, onReady]);

  // Register the event listener when the component mounts
  useEffect(() => {
    // Define the event handler inside the useEffect
    const handleValueChange = (
      payload: FormEventPayload[FormEventNames.VALUE_CHANGE]
    ) => {
      // Trigger the `onValueChange` callback if it exists
      if (onValueChange) {
        onValueChange({
          ...payload,
          values: getValues(),
        } as OnValueChangePayload<FormValues>);
      }

      const fieldDisabilities = resolveFieldDisability(getValues());
      Object.entries(fieldDisabilities).forEach(([fieldName, isDisabled]) => {
        actions.patchFieldState(fieldName, { isDisabled });
      });
    };

    const valueChangeEvent = resolveEventName(
      FormEventNames.VALUE_CHANGE,
      state.formId || ""
    );

    // Subscribe to the event
    EventBusInstance.on(valueChangeEvent, handleValueChange);

    // Unsubscribe from the event when the component unmounts
    return () => {
      EventBusInstance.off(valueChangeEvent, handleValueChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onValueChange, values]);

  // Handle form submission
  const handleSubmission = async (data: FormValues) => {
    actions.setStatus("loading");

    // Step 1: Call beforeSubmit to check if submission should proceed
    if (beforeSubmit) {
      const shouldProceed = await beforeSubmit(data);
      if (shouldProceed === false) {
        actions.setStatus("idle");
        return;
      }
    }

    // Step 2: Call onSubmit and capture the response
    let response: SubmitResponse | undefined;
    try {
      response = await onSubmit(data);
    } catch (error) {
      console.error("Error during submission:", error);
      actions.setStatus("idle");
      return;
    }

    // Step 3: Call afterSubmit with both data and response
    if (afterSubmit) {
      try {
        await afterSubmit(data, response);
      } catch (error) {
        console.error("Error in afterSubmit:", error);
      }
    }

    actions.setStatus("idle");
  };

  // Expose methods through ref
  useImperativeHandle(ref, () => ({
    resetForm: () => {
      reset();
      if (onReset) {
        onReset();
      }
    },
    setFormValue: <K extends Path<FormValues>>(name: K, value: FormValues[K]) =>
      setValue(name, value),
    submitForm: async () => {
      actions.setStatus("loading");

      const isValid = await trigger();
      if (!isValid) {
        actions.setStatus("idle");
        return;
      }

      await handleSubmit(handleSubmission)();
      actions.setStatus("idle");
    },
    setFormLoading: (loading: boolean) =>
      actions.setStatus(loading ? "loading" : "idle"),
    getFormValue: () => getValues(),
    validateForm: async () => await trigger(),
    getFieldsError: () => flattenErrors(formState.errors),
  }));

  return (
    <>
      {state.formId}
      {JSON.stringify(state.externalContext)}
      <div className="relative">
        {/* Loading Overlay */}
        {state.status === "loading" && (
          <LoadingOverlay isLoading={state.status === "loading"} />
        )}
        {/* Form */}
        <form onSubmit={methods.handleSubmit(handleSubmission)}>
          <FormProvider {...methods}>
            <FlexibleLayout rowHeight={10} isDraggable={false}>
              {React.Children.map(children, (child) => {
                if (
                  React.isValidElement(child) &&
                  child.type === FieldController
                ) {
                  const childProps: FieldControllerProps<FieldValues> =
                    child.props as FieldControllerProps<FieldValues>;
                  return (
                    <div
                      key={childProps.name}
                      data-grid={state.layout[childProps.name]}
                    >
                      {child}
                    </div>
                  );
                }

                return null;
              })}
            </FlexibleLayout>
          </FormProvider>
        </form>
      </div>
    </>
  );
};

export default forwardRef(FormController) as <
  FormValues extends FieldValues,
  SubmitResponse,
  ExternalContext
>(
  props: FormProps<FormValues, SubmitResponse, ExternalContext> & {
    ref?: React.ForwardedRef<FormRef<FormValues>>;
  }
) => JSX.Element;
