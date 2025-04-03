import {
  forwardRef,
  useImperativeHandle,
  useEffect,
  JSX,
  useContext,
} from "react";
import { useForm, FormProvider, Path } from "react-hook-form";
import { LoadingOverlay } from "@/components/molecules/loading-overlay";
import type { FieldValues } from "react-hook-form";
import { flattenErrors } from "./utils";
import { FormProps, FormRef } from "./types/form.d";
import FormContext from "./contexts/FormContext";

const FormController = <T extends FieldValues>(
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
  }: FormProps<T>,
  ref: React.ForwardedRef<FormRef<T>>
) => {
  const { state, actions } = useContext(FormContext);

  // Khởi tạo useForm với resolver tùy chỉnh và mode
  const methods = useForm<T>({
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

  // Khởi tạo giá trị ban đầu của form
  useEffect(() => {
    const initializeForm = async () => {
      if (typeof init === "function") {
        actions.setStatus("loading");

        try {
          const resolvedValues = await (init as () => Promise<T>)();
          reset(resolvedValues);
        } catch (error) {
          console.error("Failed to initialize form:", error);
        } finally {
          actions.setStatus("idle");
        }
      } else if (init) {
        reset(init);
      }
    };

    initializeForm();
  }, [init, reset]);

  // Theo dõi sự thay đổi giá trị trong form
  useEffect(() => {
    if (onValueChange) {
      onValueChange(values);
    }
  }, [values, onValueChange]);

  // Xử lý submit
  const handleSubmission = async (data: T) => {
    actions.setStatus("loading");

    // Step 1: Gọi beforeSubmit để kiểm tra xem có nên tiếp tục submit hay không
    if (beforeSubmit) {
      const shouldProceed = await beforeSubmit(data);
      if (shouldProceed === false) {
        actions.setStatus("idle");
        return;
      }
    }

    // Step 2: Gọi hàm onSubmit và nhận response
    await onSubmit(data);

    // Step 3: Gọi afterSubmit từ props để xử lý logic sau submit
    if (afterSubmit) {
      await afterSubmit(data);
    }
    actions.setStatus("idle");
  };

  // Expose các phương thức thông qua ref
  useImperativeHandle(ref, () => ({
    resetForm: () => {
      reset();
      if (onReset) {
        onReset();
      }
    },
    setFormValue: <K extends Path<T>>(name: K, value: T[K]) =>
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
      <div className="relative">
        {/* Loading Overlay */}
        {state.status === "loading" && (
          <LoadingOverlay isLoading={state.status === "loading"} />
        )}
        {/* Form */}
        <form onSubmit={methods.handleSubmit(handleSubmission)}>
          <FormProvider {...methods}>{children}</FormProvider>
        </form>
      </div>
    </>
  );
};

export default forwardRef(FormController) as <T extends FieldValues>(
  props: FormProps<T> & { ref?: React.ForwardedRef<FormRef<T>> }
) => JSX.Element;
