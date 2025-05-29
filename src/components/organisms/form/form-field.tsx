import FormFieldProvider from './context/form-field/form-field-provider';
import { LabelPlacement } from './context/context.types';
import FormFieldLayout from './field/form-field-layout';

export type FormFieldProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  name: string;
  labelPlacement?: LabelPlacement;
};

function FormField({
  name,
  children,
  className,
  labelPlacement = 'top',
}: FormFieldProps) {
  return (
    <FormFieldProvider name={name} labelPlacement={labelPlacement}>
      <FormFieldLayout labelPlacement={labelPlacement} className={className}>
        {children}
      </FormFieldLayout>
    </FormFieldProvider>
  );
}

export default FormField;
