import { Slot } from '@radix-ui/react-slot';
import { useFormFieldContext } from '../context/form-field/form-field-context';
import { useController } from 'react-hook-form';
import { ECGridItem } from '@/components/atoms/grid-layout';
import { formFieldLayoutMap } from './helper';
import { EventBusInstance } from '@/composables/utils/EventBus';
import { useFormContainerContext } from '../context/form-container/form-container-context';
import { FormEventNames, resolveEventName } from '../helpers';
import { cn } from '@/composables/utils/shadcn';

function FormFieldControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const {
    state: { controlId, fieldName, fieldLayout: labelPlacement },
  } = useFormFieldContext();
  const {
    state: { id, fieldStates },
  } = useFormContainerContext();

  const {
    field: { onChange, ...field },
    fieldState: { error },
  } = useController({ name: fieldName });

  const { x, y } = formFieldLayoutMap[labelPlacement || 'vertical'].control;

  const handleOnChange = (value: unknown) => {
    try {
      // Call field.onChange with the new value
      onChange(value);

      // Emit the VALUE_CHANGE event with the new value
      EventBusInstance.emit(resolveEventName(FormEventNames.VALUE_CHANGE, id), {
        field: fieldName,
        value,
      });
    } catch (error) {
      console.error('Error handling onChange event:', error);
    }
  };

  return (
    <ECGridItem x={x} y={y} className="__form-field-control">
      <Slot
        data-slot="form-control"
        id={controlId}
        onChange={handleOnChange}
        disabled={fieldStates[fieldName]?.disabled}
        className={cn(
          error ? 'border-secondary-red hover:border-secondary-red' : '',
        )}
        {...props}
        {...field}
      />
    </ECGridItem>
  );
}

export default FormFieldControl;
