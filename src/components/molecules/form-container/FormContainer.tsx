import { forwardRef, useImperativeHandle, useEffect, useState } from "react";
import { useForm, FormProvider, Path } from "react-hook-form";
import { LoadingOverlay } from "@/components/molecules/loading-overlay";
import type { FieldValues, FieldError } from "react-hook-form";
import { flattenErrors } from "./utils";

// Định nghĩa kiểu dữ liệu cho response của validateFunction
export interface ValidateResponse<T extends FieldValues> {
  values: T;
  errors: Record<string, { message: string }>;
}

// Kiểu dữ liệu cho props của FormContainer
interface FormContainerProps<T extends FieldValues> {
  children: React.ReactNode;
  onSubmit: (data: T) => void | Promise<void>; // Hàm xử lý submit
  validateFunction?: (data: T) => Promise<ValidateResponse<T>>; // Hàm validate tuỳ chỉnh
  init?: T | (() => Promise<T>); // Giá trị khởi tạo (đồng bộ hoặc bất đồng bộ)
  onValueChange?: (values: T) => void; // Hàm xử lý khi giá trị thay đổi
  beforeSubmit?: (data: T) => boolean | Promise<boolean>; // Trigger trước khi submit
  onSuccess?: (data: T) => void; // Trigger khi submit thành công
  onFailure?: (error: unknown, data: T) => void; // Trigger khi submit thất bại
  validationMode?: "onChange" | "onSubmit"; // Chế độ validate
  onReset?: () => void; // Hàm xử lý khi reset form
  onError?: (error: unknown) => void; // Hàm xử lý khi có lỗi
}

// Định nghĩa kiểu dữ liệu cho ref
export interface FormContainerRef<T extends FieldValues> {
  resetForm: () => void;
  setFormValue: <K extends Path<T>>(name: K, value: T[K]) => void;
  submitForm: () => Promise<void>;
  setFormLoading: (loading: boolean) => void;
  getFormValue: () => Partial<T>;
  validateForm: () => Promise<boolean>;
  getFieldsError: () => Record<string, FieldError | undefined>;
}

const FormContainer = <T extends FieldValues>(
  {
    children,
    onSubmit,
    validateFunction,
    init,
    onValueChange,
    beforeSubmit,
    onSuccess,
    onFailure,
    validationMode = "onSubmit", // Mặc định validate khi submit
    onReset,
    onError,
  }: FormContainerProps<T>,
  ref: React.ForwardedRef<FormContainerRef<T>>
) => {
  const [loading, setLoading] = useState<boolean>(false);

  // Khởi tạo useForm với resolver tùy chỉnh và mode
  const methods = useForm<T>({
    mode: validationMode, // Sử dụng mode để xác định thời điểm validate
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
        setLoading(true); // Bật loading khi đang fetch dữ liệu
        try {
          const resolvedValues = await (init as () => Promise<T>)();
          reset(resolvedValues); // Cập nhật giá trị form trực tiếp
        } catch (error) {
          console.error("Failed to initialize form:", error);
          if (onError) onError(error);
        } finally {
          setLoading(false); // Tắt loading
        }
      } else if (init) {
        reset(init); // Cập nhật giá trị form trực tiếp
      }
    };

    initializeForm();
  }, [init, reset, onError]);

  // Theo dõi sự thay đổi giá trị trong form
  useEffect(() => {
    if (onValueChange) {
      onValueChange(values);
    }
  }, [values, onValueChange]);

  // Xử lý submit
  const handleSubmission = async (data: T) => {
    setLoading(true);
    try {
      // Gọi beforeSubmit để kiểm tra xem có nên tiếp tục submit hay không
      if (beforeSubmit) {
        const shouldProceed = await beforeSubmit(data);
        if (shouldProceed === false) {
          setLoading(false);
          console.log("Submit canceled by beforeSubmit");
          return;
        }
      }

      // Gọi hàm onSubmit
      await onSubmit(data);

      // Gọi onSuccess nếu submit thành công
      if (onSuccess) {
        onSuccess(data);
      }
    } catch (error) {
      // Gọi onFailure nếu submit thất bại
      if (onFailure) {
        onFailure(error, data);
      }

      // Gọi onError để xử lý lỗi toàn cục
      if (onError) {
        onError(error);
      }

      console.error("Submit failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Expose các phương thức thông qua ref
  useImperativeHandle(ref, () => ({
    resetForm: () => {
      reset(); // Reset form về trạng thái ban đầu
      if (onReset) onReset(); // Gọi onReset nếu có
    },
    setFormValue: <K extends Path<T>>(name: K, value: T[K]) =>
      setValue(name, value),
    submitForm: async () => {
      setLoading(true);
      try {
        const isValid = await trigger();
        if (isValid) {
          await handleSubmit(handleSubmission)();
        }
      } catch (error) {
        if (onError) onError(error); // Gọi onError khi có lỗi
        console.error("Validation or submission failed:", error);
      } finally {
        setLoading(false);
      }
    },
    setFormLoading: (loading: boolean) => setLoading(loading),
    getFormValue: () => getValues(),
    validateForm: async () => await trigger(),
    getFieldsError: () => flattenErrors(formState.errors),
  }));

  return (
    <>
      <div className="relative">
        {/* Loading Overlay */}
        {loading && <LoadingOverlay isLoading={loading} />}

        {/* Form */}
        <form onSubmit={methods.handleSubmit(handleSubmission)}>
          <FormProvider {...methods}>{children}</FormProvider>
        </form>
      </div>
    </>
  );
};

export default forwardRef(FormContainer);