import { ECGridItem } from '@/components/atoms/grid-layout';
import { useFormFieldContext } from '../context/form-field/form-field-context';
import { formFieldLayoutMap } from './helper';
import React from 'react';
import { cn } from '@/composables/utils/shadcn';

function FormFieldDescription({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  const {
    state: { fieldLayout: labelPlacement, id },
    actions: { setShowDescription },
  } = useFormFieldContext();

  const { x, y } = formFieldLayoutMap[labelPlacement || 'vertical'].description;

  React.useEffect(() => {
    setShowDescription(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ECGridItem
      x={x}
      y={y}
      className={cn('__form-field-description typography-regular-12 text-black-40', className)}
    >
      {children} {id}
    </ECGridItem>
  );
}

export default FormFieldDescription;
