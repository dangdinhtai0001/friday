import { Path, FieldError, FieldValues } from "react-hook-form";

// Định nghĩa kiểu dữ liệu cho response của validateFunction
export interface ValidateResponse<T extends FieldValues> {
  values: T;
  errors: Record<string, { message: string }>;
}

// Kiểu dữ liệu cho props của FormContainer
export interface FormProps<T extends FieldValues> {
  children: React.ReactNode;
  onSubmit: (data: T) => void | Promise<void>; // Hàm xử lý submit
  validateFunction?: (data: T) => Promise<ValidateResponse<T>>; // Hàm validate tuỳ chỉnh
  init?: T | (() => Promise<T>); // Giá trị khởi tạo (đồng bộ hoặc bất đồng bộ)
  onValueChange?: (values: T) => void; // Hàm xử lý khi giá trị thay đổi
  beforeSubmit?: (data: T) => boolean | Promise<boolean>; // Trigger trước khi submit
  afterSubmit?: (data: T) => void | Promise<void>; // Trigger sau khi submit
  validationMode?: "onChange" | "onSubmit"; // Chế độ validate
  onReset?: () => void; // Hàm xử lý khi reset form
}

// Định nghĩa kiểu dữ liệu cho ref
export interface FormRef<T extends FieldValues> {
  resetForm: () => void;
  setFormValue: <K extends Path<T>>(name: K, value: T[K]) => void;
  submitForm: () => Promise<void>;
  setFormLoading: (loading: boolean) => void;
  getFormValue: () => Partial<T>;
  validateForm: () => Promise<boolean>;
  getFieldsError: () => Record<string, FieldError | undefined>;
}
