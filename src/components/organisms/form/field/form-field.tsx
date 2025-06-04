import { ECGridItem, ECGridItemProps } from '@/components/atoms/grid-layout';
import { FieldLayout } from '../context/context.types';
import FormFieldProvider from '../context/form-field/form-field-provider';
import FormFieldLayout from './form-field-layout';

export type FormFieldProps = ECGridItemProps & {
  name: string;
  fieldLayout?: FieldLayout;
  required?: boolean;
};

function FormField({
  name,
  children,
  fieldLayout = 'vertical',
  required = false,
  ...props
}: FormFieldProps) {
  return (
    <ECGridItem {...props}>
      <FormFieldProvider
        name={name}
        fieldLayout={fieldLayout}
        required={required}
      >
        <FormFieldLayout fieldLayout={fieldLayout}>{children}</FormFieldLayout>
      </FormFieldProvider>
    </ECGridItem>
  );
}

export default FormField;
