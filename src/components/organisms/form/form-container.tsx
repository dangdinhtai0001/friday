import {
  FieldValues,
  FormProvider,
  useForm,
  UseFormProps,
} from 'react-hook-form';
import { ECGridLayout } from '../grid-layout';
import { GridLayoutProps } from '@/components/organisms/grid-layout';

export type FormContainerProps = React.HTMLAttributes<HTMLDivElement> &
  UseFormProps &
  GridLayoutProps;

function FormContainer<FormValues extends FieldValues>({
  children,
  rows,
  cols = 1,
  gapRow = '8px',
  gapCol = '8px',
}: FormContainerProps) {
  const methods = useForm<FormValues>();

  // Handle form submission
  const handleSubmission = async (data: FormValues) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmission)}>
        <ECGridLayout rows={rows} cols={cols} gapCol={gapCol} gapRow={gapRow}>
          {children}
        </ECGridLayout>
      </form>
      <button
        onClick={() => {
          methods.handleSubmit(handleSubmission)();
        }}
      >
        submit
      </button>
    </FormProvider>
  );
}

export default FormContainer;
