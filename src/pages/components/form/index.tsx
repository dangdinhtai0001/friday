import { MCButton } from '@/components/atoms/button';
import {
  MCSelect,
  MCSelectContent,
  MCSelectItem,
  MCSelectTrigger,
  MCSelectValue,
} from '@/components/atoms/select';
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
  OnValueChangeParams,
  ValidateResponse,
} from '@/components/organisms/form/form-container';
import { disablePolicy, initData } from './form';

export interface ProductInput {
  productName?: string;
  price?: number;
  category?: 'Electronics' | 'Books' | 'Clothing' | 'Home & Kitchen' | 'Other';
  isInStock?: boolean;
}

const validateFunction = async (
  data: ProductInput,
): Promise<ValidateResponse<ProductInput>> => {
  const errors: Record<string, { message: string }> = {};

  if (data.productName === '123') {
    errors.productName = { message: 'Có lỗi nè' };
  }

  return {
    values: Object.keys(errors).length > 0 ? {} : data,
    errors,
  };
};

function Page() {
  const { formRef, resetForm, submitForm, validateForm, getFieldsError } =
    useFormController();
  return (
    <>
      <div className="border-black-10 rounded-8 border p-8">
        <ECFormContainerProvider>
          <ECFormContainer
            cols={2}
            rows={3}
            className=""
            init={initData}
            onReady={(state: FormContainerState) => {
              console.log(`form: ${state.id} ready`);
            }}
            onSubmit={(data: ProductInput) => {
              console.log('onSubmit', data);
            }}
            onValueChange={(params: OnValueChangeParams<ProductInput>) => {
              console.log('onValueChange', params);
            }}
            validateFunction={validateFunction}
            disablePolicy={disablePolicy}
            ref={formRef}
          >
            <ECFormField name="productName">
              <ECFormFieldLabel>Tên sản phẩm</ECFormFieldLabel>
              <ECFormFieldControl>
                <ECTextField placeholder="Nhập tên sản phẩm" />
              </ECFormFieldControl>
            </ECFormField>

            <ECFormField name="productCode">
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

            <ECFormField name="category">
              <ECFormFieldLabel>Danh mục</ECFormFieldLabel>
              <ECFormFieldControl>
                <ECTextField placeholder="Nhập danh mục" />
              </ECFormFieldControl>
            </ECFormField>

            {/* isAvailable là boolean, nhưng yêu cầu là text field, nên có thể nhập "true" hoặc "false" */}
            <ECFormField name="isAvailable">
              <ECFormFieldLabel>Còn hàng?</ECFormFieldLabel>
              <ECFormFieldControl>
                <ECTextField placeholder="true/false" />
              </ECFormFieldControl>
            </ECFormField>

            <ECFormField name="deliveryOption">
              <ECFormFieldLabel>Tùy chọn giao hàng</ECFormFieldLabel>
              <ECFormFieldControl>
                <ECTextField placeholder="Nhập tùy chọn giao hàng" />
              </ECFormFieldControl>
            </ECFormField>

            <ECFormField name="deliveryAddress">
              <ECFormFieldLabel>Địa chỉ giao hàng</ECFormFieldLabel>
              <ECFormFieldControl>
                <ECTextField placeholder="Nhập địa chỉ giao hàng" />
              </ECFormFieldControl>
            </ECFormField>

            <ECFormField name="notes">
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

      <MCSelect>
        <MCSelectTrigger>
          <MCSelectValue placeholder="Select a fruit" />
        </MCSelectTrigger>

        <MCSelectContent>
          <MCSelectItem value="apple">Apple</MCSelectItem>
          <MCSelectItem value="banana">Banana</MCSelectItem>
          <MCSelectItem value="orange">Orange</MCSelectItem>
        </MCSelectContent>
      </MCSelect>
    </>
  );
}

export default Page;
