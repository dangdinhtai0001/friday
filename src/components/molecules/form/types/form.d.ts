import { Path, FieldError, FieldValues } from "react-hook-form";
import { FormState, FormActions } from "./context.d";
import { FieldState } from "./field";
import { Layout } from "react-grid-layout";

// Định nghĩa kiểu dữ liệu cho response của validateFunction
export interface ValidateResponse<T extends FieldValues> {
  values: T;
  errors: Record<string, { message: string }>;
}

export interface FormLayout {
  [fieldName: string]: Layout;
}

export interface OnValueChangePayload<FormValues extends FieldValues> {
  field: string;
  value: unknown;
  values: FormValues;
}

// Data type for FormContainer props
export interface FormProps<
  FormValues extends FieldValues,
  SubmitResponse,
  ExternalContext
> {
  children: React.ReactNode;
  // onValueChange?: (values: FormValues) => void; // Handler function when values change
  onValueChange?: (payload: OnValueChangePayload) => void; // Handler function when values change
  beforeSubmit?: (values: FormValues) => boolean | Promise<boolean>; // Trigger before submission
  afterSubmit: (
    values: FormValues,
    response: SubmitResponse
  ) => void | Promise<void>; // Trigger after submission, receives both the form data and the response
  validateFunction?: (data: FormValues) => Promise<ValidateResponse<T>>; // Custom validation function
  init?: FormValues | (() => Promise<FormValues>); // Initial value (synchronous or asynchronous)
  onSubmit: (data: FormValues) => SubmitResponse | Promise<SubmitResponse>; // Submit handler function now returns a response of type R
  validationMode?: "onChange" | "onSubmit"; // Validation mode
  onReset?: () => void; // Handler function when resetting the form
  onReady?: (
    state: FormState<ExternalContext>,
    actions: FormActions<ExternalContext>
  ) => void; // Hook triggered when the form is ready
  externalContext?: ExternalContext; // Optional external context to pass via props
  initialFieldState: FieldState;
  initialLayout: FormLayout;
  resolveFieldDisability: (
    values: FormValues
  ) => Partial<Record<keyof FormValues, boolean>>;
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
