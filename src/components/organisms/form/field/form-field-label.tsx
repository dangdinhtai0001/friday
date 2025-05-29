import { MCLabel } from '@/components/atoms/label';
import { cn } from '@/composables/utils/shadcn';
import * as LabelPrimitive from '@radix-ui/react-label';
import { useFormFieldContext } from '../context/form-field/form-field-context';

function FormFieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const {
    state: { controlId },
  } = useFormFieldContext();

  return (
    <MCLabel
      data-slot="form-label"
      //   data-error={!!error}
      className={cn('data-[error=true]:text-destructive', className)}
      htmlFor={controlId}
      {...props}
    />
  );
}

export default FormFieldLabel;
