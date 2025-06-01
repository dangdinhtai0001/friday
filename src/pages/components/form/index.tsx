import { MCButton } from '@/components/atoms/button';
import {
  ECSelectAsFormControl,
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
  ECFormFieldDescription,
  ECFormFieldLabel,
  useFormController,
} from '@/components/organisms/form';
import { FormContainerState } from '@/components/organisms/form/context/context.types';
import {
  OnValueChangeParams,
  ValidateResponse,
} from '@/components/organisms/form/form-container';

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
      <div className='border border-black-10 rounded-8 p-8'>
        <ECFormContainerProvider>
          <ECFormContainer
            cols={2}
            rows={3}
            className=""
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
            ref={formRef}
          >
            <ECFormField name="productName" width={2}>
              <ECFormFieldLabel>Product Name</ECFormFieldLabel>
              <ECFormFieldControl>
                <ECTextField />
              </ECFormFieldControl>
              <ECFormFieldDescription>
                <span>hehehe</span>
              </ECFormFieldDescription>
            </ECFormField>
            <ECFormField name="price">
              <ECFormFieldLabel>Price</ECFormFieldLabel>
              <ECFormFieldControl>
                <ECTextField />
              </ECFormFieldControl>
            </ECFormField>
            <ECFormField name="category">
              <ECFormFieldLabel>Category</ECFormFieldLabel>
              <ECFormFieldControl>
                <ECSelectAsFormControl>
                  <MCSelectTrigger className="w-full">
                    <MCSelectValue placeholder="Select a fruit" />
                  </MCSelectTrigger>

                  <MCSelectContent>
                    <MCSelectItem value="Electronics">Electronics</MCSelectItem>
                    <MCSelectItem value="Books">Books</MCSelectItem>
                    <MCSelectItem value="Clothing">Clothing</MCSelectItem>
                    <MCSelectItem value="Home & Kitchen">
                      Home & Kitchen
                    </MCSelectItem>
                    <MCSelectItem value="Other">Other</MCSelectItem>
                  </MCSelectContent>
                </ECSelectAsFormControl>
              </ECFormFieldControl>
            </ECFormField>
            <ECFormField name="isInStock">
              <ECFormFieldLabel>In stock</ECFormFieldLabel>
              <ECFormFieldControl>
                <ECTextField />
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
