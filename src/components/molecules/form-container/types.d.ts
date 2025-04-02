import { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form';

// Kiểu dữ liệu cho props của FormContainer
interface FormContainerProps<T extends FieldValues> {
  children: React.ReactNode;
  onSubmit: (data: T) => void;
  defaultValues?: UseFormProps<T>['defaultValues'];
  validationSchema?: UseFormProps<T>['resolver'];
}

// Kiểu dữ liệu cho props của FormField
interface FormFieldProps<T extends FieldValues> {
  name: keyof T;
  label: string;
  type?: string;
  rules?: Record<string, any>; // Rules for validation
}