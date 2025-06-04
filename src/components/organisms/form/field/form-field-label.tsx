import { MCLabel } from '@/components/atoms/label';
import { cn } from '@/composables/utils/shadcn';
import * as LabelPrimitive from '@radix-ui/react-label';
import { useFormFieldContext } from '../context/form-field/form-field-context';
import { ECGridItem } from '@/components/atoms/grid-layout';

export type FormFieldLabelProps = React.ComponentProps<
  typeof LabelPrimitive.Root
>;

function FormFieldLabel({
  className,
  children,
  ...props
}: FormFieldLabelProps) {
  const {
    state: { controlId, required },
  } = useFormFieldContext();

  return (
    <ECGridItem x={1} y={1} className="__form-field-label">
      <MCLabel
        data-slot="form-label"
        //   data-error={!!error}
        className={cn(
          'typography-regular-12 text-black-40 flex items-center gap-x-[1px]',
          className,
        )}
        htmlFor={controlId}
        {...props}
      >
        {children}
        {required && <span className="text-secondary-red">*</span>}
      </MCLabel>
    </ECGridItem>
  );
}

export default FormFieldLabel;
