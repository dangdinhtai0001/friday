import { MCButton } from '@/components/atoms/button';
import MCTextField from '@/components/atoms/text-field/MCTextField';
import {
  ECFormContainer,
  ECFormContainerProvider,
  ECFormField,
  ECFormFieldControl,
  ECFormFieldDescription,
  ECFormFieldLabel,
  useFormController,
} from '@/components/organisms/form';
import { FormContainerState } from '@/components/organisms/form/context/context.types';
import { ValidateResponse } from '@/components/organisms/form/form-container';

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
      <ECFormContainerProvider>
        <ECFormContainer
          cols={4}
          className="border"
          onReady={(state: FormContainerState) => {
            console.log(`form: ${state.id} ready`);
          }}
          onSubmit={(data: ProductInput) => {
            console.log(data);
          }}
          validateFunction={validateFunction}
          ref={formRef}
        >
          <ECFormField name="productName" width={2} height={2}>
            <ECFormFieldLabel>Product Name</ECFormFieldLabel>
            <ECFormFieldControl>
              <MCTextField />
            </ECFormFieldControl>
            <ECFormFieldDescription>
              <span>hehehe</span>
            </ECFormFieldDescription>
          </ECFormField>
          <ECFormField name="price">
            <ECFormFieldLabel>Price</ECFormFieldLabel>
          </ECFormField>
          <ECFormField name="category">
          <ECFormFieldLabel>Category</ECFormFieldLabel>
          </ECFormField>
          <ECFormField name="isInStock">
          <ECFormFieldLabel>In stock</ECFormFieldLabel>
          </ECFormField>
        </ECFormContainer>
      </ECFormContainerProvider>
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
