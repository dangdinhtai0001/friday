import { ECButton } from '@/components/atoms/button';
import { useFormController } from '@/components/organisms/form';
import { FormRef } from '@/components/organisms/form/form-container';
import { PropsWithChildren, RefObject } from 'react';
import { FieldValues } from 'react-hook-form';

export interface FilterableDataGridProps {
  filterContainer?:
    | React.ReactNode
    | ((ref: RefObject<FormRef<FieldValues> | null>) => React.ReactNode);
}

function FilterableDataGrid({
  filterContainer,
}: PropsWithChildren<FilterableDataGridProps>) {
  const { formRef, resetForm, submitForm, validateForm, getFieldsError, getFormValue } =
    useFormController();

  const renderFilterContainer = () => {
    if (filterContainer) {
      return typeof filterContainer === 'function'
        ? filterContainer(formRef)
        : filterContainer;
    }

    return <></>;
  };

  return (
    <>
      <div className="border-black-10 rounded-8 border p-8">
        {renderFilterContainer()}
        <ECButton
          onClick={() => {
            console.log(getFormValue());
          }}
        >
          Submit
        </ECButton>
      </div>
    </>
  );
}

export default FilterableDataGrid;
