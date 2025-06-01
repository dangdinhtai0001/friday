import { Slot } from '@radix-ui/react-slot';
import { useFormFieldContext } from '../context/form-field/form-field-context';
import { useController } from 'react-hook-form';
import { ECGridItem } from '@/components/atoms/grid-layout';
import { formFieldLayoutMap } from './helper';
import { EventBusInstance } from '@/composables/utils/EventBus';
import { useFormContainerContext } from '../context/form-container/form-container-context';
import { FormEventNames, resolveEventName } from '../helpers';

function FormFieldControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const {
    state: { controlId, fieldName, fieldLayout: labelPlacement },
  } = useFormFieldContext();
  const {
    state: { id },
  } = useFormContainerContext();

  const {
    field: { onChange, ...field },
  } = useController({ name: fieldName });

  const { x, y } = formFieldLayoutMap[labelPlacement || 'vertical'].control;

  const handleOnChange = (value: unknown) => {
    try {
      // // Check if e is a valid event object
      // if (typeof e !== 'object' || e === null) {
      //   console.error('Invalid event object:', e);
      //   return;
      // }

      // // Cast e to EventTarget to access the target property
      // const target = (
      //   e as React.ChangeEvent<
      //     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      //   >
      // ).target;

      // let value: unknown;

      // // Handle based on the input type
      // if (target instanceof HTMLInputElement) {
      //   if (target.type === 'checkbox') {
      //     // For checkboxes, get the value from the checked property
      //     value = target.checked;
      //   } else if (target.type === 'file') {
      //     // For file inputs, get the list of files
      //     value = Array.from(target.files || []);
      //   } else {
      //     // For other input types, get the value from the value property
      //     value = target.value;
      //   }
      // } else if (target instanceof HTMLTextAreaElement) {
      //   // For textareas, get the value from the value property
      //   value = target.value;
      // } else if (target instanceof HTMLSelectElement) {
      //   if (target.multiple) {
      //     // For multi-select, get all selected values
      //     value = Array.from(target.selectedOptions).map(
      //       (option) => option.value,
      //     );
      //   } else {
      //     // For single-select, get the selected value
      //     value = target.value;
      //   }
      // } else {
      //   console.error('Unsupported input type:', target);
      //   return;
      // }

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
        {...props}
        {...field}
      />
    </ECGridItem>
  );
}

export default FormFieldControl;
