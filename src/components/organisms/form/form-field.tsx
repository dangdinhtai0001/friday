import FormFieldProvider from './context/form-field/form-field-provider';
import { FieldLayout } from './context/context.types';
import FormFieldLayout from './field/form-field-layout';
import { ECGridItem, ECGridItemProps } from '@/components/atoms/grid-layout';

export type FormFieldProps = ECGridItemProps & {
  name: string;
  fieldLayout?: FieldLayout;
};

function FormField({
  name,
  children,
  fieldLayout = 'vertical',
  ...props
}: FormFieldProps) {
  return (
    <ECGridItem {...props}>
      <FormFieldProvider name={name} fieldLayout={fieldLayout}>
        <FormFieldLayout fieldLayout={fieldLayout}>{children}</FormFieldLayout>
      </FormFieldProvider>
    </ECGridItem>
  );
}

export default FormField;
