import { MCButton } from '@/components/atoms/button';
import { ECTextField } from '@/components/atoms/text-field';
import {
  ECFormContainer,
  ECFormContainerProvider,
  ECFormField,
  ECFormFieldControl,
  ECFormFieldLabel,
  useFormController,
} from '@/components/organisms/form';
import { FormContainerState } from '@/components/organisms/form/context/context.types';
import {
  FormPolicy,
  FormValidateFunction,
  OnValueChangeParams,
} from '@/components/organisms/form/form-container';
import {
  disabledPolicy,
  initData,
  onSubmit,
  ProductInput,
  validate,
} from './form';
import {
  ECControlledSelect,
  ECBaseOption,
} from '@/components/molecules/controlled-select';
import { MCCheckbox } from '@/components/atoms/checkbox';

type DeliveryOption = ECBaseOption & {
  label: string;
  id: string;
};
const fetchDeliveryOptions = async (): Promise<DeliveryOption[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { value: 'pickup', label: 'Nhận tại cửa hàng', id: 'pickup' },
        { value: 'delivery', label: 'Giao hàng tận nơi', id: 'delivery' },
      ]);
    }, 1500); // Giả lập độ trễ
  });
};

function Page() {
  const { formRef, resetForm, submitForm, validateForm, getFieldsError } =
    useFormController();
  return (
    <>
      <div className="border-black-10 rounded-8 border p-8">
        <ECFormContainerProvider>
          <ECFormContainer
            cols={4}
            rows={4}
            className=""
            init={initData}
            onReady={(state: FormContainerState) => {
              console.log(`form: ${state.id} ready`);
            }}
            onSubmit={onSubmit}
            onValueChange={(params: OnValueChangeParams<ProductInput>) => {
              console.log('onValueChange', params);
            }}
            validateFunction={
              validate as unknown as FormValidateFunction<ProductInput>
            }
            disabledPolicy={disabledPolicy as FormPolicy<ProductInput>}
            ref={formRef}
          >
            <ECFormField name="productName" required width={4}>
              <ECFormFieldLabel>Tên sản phẩm</ECFormFieldLabel>
              <ECFormFieldControl>
                <ECTextField placeholder="Nhập tên sản phẩm" />
              </ECFormFieldControl>
            </ECFormField>

            <ECFormField name="productCode" required>
              <ECFormFieldLabel>Mã sản phẩm</ECFormFieldLabel>
              <ECFormFieldControl>
                <ECTextField placeholder="Nhập mã sản phẩm" />
              </ECFormFieldControl>
            </ECFormField>

            <ECFormField name="price">
              <ECFormFieldLabel>Giá</ECFormFieldLabel>
              <ECFormFieldControl>
                {/* Đối với giá, bạn có thể cân nhắc dùng input type="number" hoặc thư viện định dạng tiền tệ */}
                <ECTextField type="number" placeholder="Nhập giá" />
              </ECFormFieldControl>
            </ECFormField>

            <ECFormField name="category" required>
              <ECFormFieldLabel>Danh mục</ECFormFieldLabel>
              <ECFormFieldControl>
                <ECTextField placeholder="Nhập danh mục" />
              </ECFormFieldControl>
            </ECFormField>

            {/* isAvailable là boolean, nhưng yêu cầu là text field, nên có thể nhập "true" hoặc "false" */}
            <ECFormField name="isAvailable">
              <ECFormFieldLabel>Còn hàng?</ECFormFieldLabel>
              <ECFormFieldControl>
                {/* <ECTextField placeholder="true/false" /> */}
                <MCCheckbox />
              </ECFormFieldControl>
            </ECFormField>

            <ECFormField name="deliveryOption" width={1}>
              <ECFormFieldLabel>Tùy chọn giao hàng</ECFormFieldLabel>
              <ECFormFieldControl>
                {/* <ECTextField placeholder="Nhập tùy chọn giao hàng" /> */}
                <ECControlledSelect
                  placeholder="Tùy chọn giao hàng"
                  options={fetchDeliveryOptions}
                  getOptionValue={(option) => option.value}
                  renderLabel={(option: DeliveryOption) => (
                    <div className="w-full">{option.label}</div>
                  )}
                />
              </ECFormFieldControl>
            </ECFormField>

            <ECFormField name="deliveryAddress" width={3}>
              <ECFormFieldLabel>Địa chỉ giao hàng</ECFormFieldLabel>
              <ECFormFieldControl>
                <ECTextField placeholder="Nhập địa chỉ giao hàng" />
              </ECFormFieldControl>
            </ECFormField>

            <ECFormField name="notes" width={4}>
              <ECFormFieldLabel>Ghi chú</ECFormFieldLabel>
              <ECFormFieldControl>
                <ECTextField placeholder="Nhập ghi chú" />
              </ECFormFieldControl>
            </ECFormField>
          </ECFormContainer>
        </ECFormContainerProvider>
      </div>

      <div className="flex items-center gap-4">
        <MCButton
          onClick={() => {
            submitForm();
          }}
        >
          Submit
        </MCButton>
        <MCButton
          onClick={() => {
            resetForm();
          }}
        >
          Reset
        </MCButton>
        <MCButton
          onClick={() => {
            validateForm();
          }}
        >
          Validate
        </MCButton>
        <MCButton
          onClick={() => {
            getFieldsError();
          }}
        >
          get field err
        </MCButton>
      </div>
    </>
  );
}

export default Page;
