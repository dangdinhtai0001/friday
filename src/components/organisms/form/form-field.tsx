import FormFieldProvider from './context/form-field/form-field-provider';
import { LabelPlacement } from './context/context.types';
import FormFieldLayout from './field/form-field-layout';
import { ECGridItem, ECGridItemProps } from '@/components/atoms/grid-layout';

export type FormFieldProps = ECGridItemProps & {
  name: string;
  labelPlacement?: LabelPlacement;
};

function FormField({
  name,
  children,
  labelPlacement = 'top',
  ...props
}: FormFieldProps) {
  return (
    <ECGridItem {...props}>
      <FormFieldProvider name={name} labelPlacement={labelPlacement}>
        <FormFieldLayout labelPlacement={labelPlacement}>
          {children}
        </FormFieldLayout>
      </FormFieldProvider>
    </ECGridItem>
  );
}

export default FormField;
