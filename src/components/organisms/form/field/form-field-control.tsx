import { Slot } from '@radix-ui/react-slot';
import { useFormFieldContext } from '../context/form-field/form-field-context';
import { useController } from 'react-hook-form';

function FormFieldControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const {
    state: { controlId, fieldName },
  } = useFormFieldContext();

  const { field } = useController({ name: fieldName });

  return <Slot data-slot="form-control" id={controlId} {...props} {...field} />;
}

export default FormFieldControl;
