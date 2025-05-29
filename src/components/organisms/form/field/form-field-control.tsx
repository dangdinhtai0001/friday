import { Slot } from '@radix-ui/react-slot';
import { useFormFieldContext } from '../context/form-field/form-field-context';
import { useController } from 'react-hook-form';
import { ECGridItem } from '@/components/atoms/grid-layout';
import { formFieldLayoutMap } from './helper';

function FormFieldControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const {
    state: { controlId, fieldName, labelPlacement },
  } = useFormFieldContext();

  const { field } = useController({ name: fieldName });

  const { x, y } = formFieldLayoutMap[labelPlacement || 'top'].control;

  return (
    <ECGridItem x={x} y={y} className="">
      <Slot data-slot="form-control" id={controlId} {...props} {...field} />
    </ECGridItem>
  );
}

export default FormFieldControl;
