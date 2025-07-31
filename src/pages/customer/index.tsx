import {
  ECBaseOption,
  ECControlledSelect,
} from '@/components/molecules/controlled-select';
import { BaseOption } from '@/components/molecules/controlled-select/types';
import {
  ECFormContainerProvider,
  ECFormContainer,
  ECFormField,
  ECFormFieldLabel,
  ECFormFieldControl,
} from '@/components/organisms/form';
import { FilterableDataGrid } from '@/components/templates/filterable-data-grid';

function Page() {


  const renderFilterContainer = () => {
    return (
      <>
        <ECFormContainerProvider>
          <ECFormContainer cols={3} rows={1}>
            <ECFormField name="status" required width={1}>
              <ECFormFieldLabel>Trạng thái</ECFormFieldLabel>
              <ECFormFieldControl>
                <ECControlledSelect
                  placeholder="Tùy chọn giao hàng"
                  options={fetchCustomerStatus}
                  getOptionValue={(option) => option.value}
                  renderLabel={(option: BaseOption) => (
                    <div className="w-full">{option.label}</div>
                  )}
                />
              </ECFormFieldControl>
            </ECFormField>
          </ECFormContainer>
        </ECFormContainerProvider>
      </>
    );
  };
  return (
    <>
      <FilterableDataGrid
        filterContainer={renderFilterContainer}
      ></FilterableDataGrid>
    </>
  );
}

const fetchCustomerStatus = async (): Promise<ECBaseOption[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { value: 'ACTIVE', label: 'Active' },
        { value: 'INACTIVE', label: 'Inactive' },
      ]);
    }, 500); // Giả lập độ trễ
  });
};

export default Page;
