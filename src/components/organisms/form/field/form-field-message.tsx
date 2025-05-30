import React from 'react';
import { FieldControlState } from '../context/context.types';
import { cn } from '@/composables/utils/shadcn';

export type FormFieldMessageProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  message: FieldControlState['message'];
  type?: FieldControlState['messageType'];
};

function FormFieldMessage({
  message,
  type = 'info',
  className,
}: FormFieldMessageProps) {
  return (
    <div
      className={cn(
        'typography-regular-12',
        getMessageTypeClass(type),
        className,
      )}
    >
      {message}
    </div>
  );
}

function getMessageTypeClass(type?: FormFieldMessageProps['type']): string {
  switch (type) {
    case 'error':
      return 'text-secondary-red';
    case 'warning':
      return 'text-secondary-yellow';
    case 'info':
      return 'text-secondary-black-100';
    case 'success':
      return 'text-secondary-green';
    default:
      return '';
  }
}

export default FormFieldMessage;
