import { MCLabel } from '@/components/atoms/label';
import { cn } from '@/composables/utils/shadcn';
import * as LabelPrimitive from '@radix-ui/react-label';
import { useFormFieldContext } from '../context/form-field/form-field-context';
import { ECGridItem } from '@/components/atoms/grid-layout';

function FormFieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const {
    state: { controlId },
  } = useFormFieldContext();

  return (
    <ECGridItem x={1} y={1} className="">
      <MCLabel
        data-slot="form-label"
        //   data-error={!!error}
        className={cn('typography-regular-12 text-black-40 ', className)}
        htmlFor={controlId}
        {...props}
      />
    </ECGridItem>
  );
}

export default FormFieldLabel;
