import { cn } from '@/composables/utils/shadcn';
import FormFieldProvider from './context/form-field/form-field-provider';

export type FormFieldProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  name: string;
};

function FormField({ name, children, className }: FormFieldProps) {
  return (
    <div
      className={cn(
        'bg-secondary-blue text-white-100 typography-semibold-14 flex h-full w-full items-center justify-center rounded-lg p-4',
        className,
      )}
    >
      <FormFieldProvider name={name}>{children}</FormFieldProvider>
    </div>
  );
}

export default FormField;
