import MCTextField from '@/components/atoms/text-field/MCTextField';
import {
  ECFormContainer,
  ECFormContainerProvider,
  ECFormField,
  ECFormFieldControl,
  ECFormFieldLabel,
} from '@/components/organisms/form';

export interface ProductInput {
  productName: string;
  price: number;
  category: "Electronics" | "Books" | "Clothing" | "Home & Kitchen" | "Other";
  isInStock: boolean;
}

function Page() {
  return (
    <div>
      <ECFormContainerProvider>
        <ECFormContainer cols={2}>
          <ECFormField name='productName'>
            <ECFormFieldLabel>Product Name</ECFormFieldLabel>
            <ECFormFieldControl>
              <MCTextField />
            </ECFormFieldControl>
          </ECFormField>
          <ECFormField name='price'>
            <ECFormFieldLabel>Price</ECFormFieldLabel>
          </ECFormField>
          <ECFormField name='category'>3</ECFormField>
          <ECFormField name='isInStock'>4</ECFormField>
        </ECFormContainer>
      </ECFormContainerProvider>
    </div>
  );
}

export default Page;
