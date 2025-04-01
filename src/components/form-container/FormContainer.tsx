import { useForm, FormProvider } from "react-hook-form";
import type { UseFormReturn, FieldValues, UseFormProps } from "react-hook-form";
import { useEffect, useState } from "react";

// Kiểu dữ liệu cho props của FormContainer
interface FormContainerProps<T extends FieldValues> {
  children: React.ReactNode;
  onSubmit: (data: T) => void | Promise<void>; // Hàm xử lý submit
  defaultValues?: UseFormProps<T>['defaultValues']; // Giá trị mặc định
  validationSchema?: UseFormProps<T>['resolver']; // Schema validation
  init?: T | (() => Promise<T>); // Giá trị khởi tạo (đồng bộ hoặc bất đồng bộ)
  onValueChange?: (values: T) => void; // Hàm xử lý khi giá trị thay đổi
  beforeSubmit?: (data: T) => boolean | Promise<boolean>; // Trigger trước khi submit
  afterSubmit?: (error: any, data: T) => void; // Trigger sau khi submit
}

const FormContainer = <T extends FieldValues>({
  children,
  onSubmit,
  defaultValues,
  validationSchema,
  init,
  onValueChange,
  beforeSubmit,
  afterSubmit,
}: FormContainerProps<T>) => {
  const [initialValues, setInitialValues] = useState<T | undefined>(undefined);

  const methods: UseFormReturn<T> = useForm<T>({
    defaultValues: initialValues || defaultValues, // Sử dụng giá trị khởi tạo nếu có
    resolver: validationSchema, // Sử dụng resolver nếu có validationSchema
  });

  const { handleSubmit, reset, watch } = methods;

  // Theo dõi sự thay đổi giá trị trong form
  const values = watch();

  // Xử lý giá trị khởi tạo (sync hoặc async)
  useEffect(() => {
    const initializeForm = async () => {
      if (typeof init === "function") {
        const resolvedValues = await (init as () => Promise<T>)();
        setInitialValues(resolvedValues);
        reset(resolvedValues); // Đặt lại giá trị form với giá trị khởi tạo
      } else if (init) {
        setInitialValues(init);
        reset(init); // Đặt lại giá trị form với giá trị khởi tạo
      }
    };

    initializeForm();
  }, [init, reset]);

  // Gọi hàm xử lý khi giá trị thay đổi
  useEffect(() => {
    if (onValueChange) {
      onValueChange(values);
    }
  }, [values, onValueChange]);

  // Xử lý submit với trigger trước và sau
  const handleSubmission = async (data: T) => {
    try {
      // Trigger trước khi submit
      if (beforeSubmit) {
        const shouldProceed = await beforeSubmit(data);
        if (shouldProceed === false) {
          console.log("Submit canceled by beforeSubmit");
          return; // Hủy quá trình submit nếu beforeSubmit trả về false
        }
      }

      // Thực hiện submit
      await onSubmit(data);

      // Trigger sau khi submit thành công
      if (afterSubmit) {
        afterSubmit(null, data); // Gọi afterSubmit với dữ liệu submit
      }
    } catch (error) {
      // Trigger sau khi submit thất bại
      if (afterSubmit) {
        afterSubmit(error, data); // Gọi afterSubmit với lỗi
      }
      console.error("Submit failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmission)}>
      <FormProvider {...methods}>{children}</FormProvider>
    </form>
  );
};

export default FormContainer;