import { ECGridLayout } from '@/components/atoms/grid-layout';
import { FieldLayout } from '../context/context.types';
import { useFormFieldContext } from '../context/form-field/form-field-context';
import { cn } from '@/composables/utils/shadcn';
import { useController } from 'react-hook-form';
import FormFieldMessage from './form-field-message';
import { useFormContainerContext } from '../context/form-container/form-container-context';
import { AnimatePresence, motion } from 'motion/react';

// Định nghĩa một kiểu dữ liệu cho cấu hình layout tổng thể
type FormFieldGridLayoutConfig = {
  cols: number; // Số cột cơ bản cho GridLayout
  baseRows: number; // Số hàng cơ bản không có description/message
  descriptionRowOffset: number; // Số hàng cộng thêm khi có description
  messageRowOffset: number; // Số hàng cộng thêm khi có message
};

// Map chứa cấu hình layout cho từng loại labelPlacement
const formFieldGridLayoutConfigs: Record<
  FieldLayout,
  FormFieldGridLayoutConfig
> = {
  vertical: {
    cols: 1, // Khi label ở trên, thường chỉ cần 1 cột cho các thành phần chính
    baseRows: 2, // Label (1) + Control (1) = 2 hàng
    descriptionRowOffset: 1, // Thêm 1 hàng nếu có description
    messageRowOffset: 1, // Thêm 1 hàng nếu có message
  },
  horizontal: {
    cols: 2, // Khi label ở bên trái, cần 2 cột (Label | Control)
    baseRows: 1, // Label và Control nằm cùng hàng (1 hàng)
    descriptionRowOffset: 1, // Thêm 1 hàng nếu có description (nằm dưới)
    messageRowOffset: 1, // Thêm 1 hàng nếu có message (nằm dưới)
  },
};

interface FormFieldLayoutProps {
  children: React.ReactNode;
  className?: string;
  fieldLayout?: FieldLayout;
}

function FormFieldLayout({
  children,
  className,
  fieldLayout,
}: FormFieldLayoutProps) {
  const {
    state: {
      hasDescription,
      hasMessage,
      fieldLayout: contextLabelPlacement,
      fieldName,
    },
  } = useFormFieldContext();

  const {
    state: { fieldStates },
  } = useFormContainerContext();

  const {
    fieldState: { error },
  } = useController({ name: fieldName });

  // Ưu tiên labelPlacement từ props, nếu không thì dùng từ context
  const effectiveLabelPlacement =
    fieldLayout || contextLabelPlacement || 'vertical';

  // Lấy cấu hình layout từ bảng tra cứu
  let config = formFieldGridLayoutConfigs[effectiveLabelPlacement];

  // Nếu không tìm thấy cấu hình (trường hợp hiếm nếu types chuẩn xác)
  if (!config) {
    console.warn(
      `No grid layout configuration found for label placement: ${effectiveLabelPlacement}. Defaulting to 'vertical' config.`,
    );
    // Fallback về config mặc định
    const defaultTopConfig = formFieldGridLayoutConfigs['vertical'];
    if (!defaultTopConfig) {
      // Đảm bảo default cũng tồn tại
      return null; // Hoặc ném lỗi, tùy vào xử lý của bạn
    }
    // Sử dụng bản sao để tránh thay đổi trực tiếp bản gốc
    config = { ...defaultTopConfig };
  }

  // Tính toán số hàng cuối cùng
  let totalRows = config.baseRows;
  if (hasDescription) {
    totalRows += config.descriptionRowOffset;
  }
  if (hasMessage) {
    totalRows += config.messageRowOffset;
  }

  const renderMessage = () => {
    const message = error?.message || fieldStates[fieldName]?.message;
    const type = error?.message
      ? 'error'
      : (fieldStates[fieldName]?.messageType ?? undefined);

    return (
      <AnimatePresence mode="popLayout">
        {message && (
          <motion.div
            key={fieldName + '-message'} 
            initial={{ y: -10, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{
              type: 'spring', 
              stiffness: 300, 
              damping: 25,
              duration: 0.3,
            }}
          >
            <FormFieldMessage message={message} type={type} />
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <ECGridLayout
      className={cn('__form-field-layout rounded-8 px-8 py-4', className)}
      cols={config.cols}
      rows={totalRows}
      gapRow="0px"
      gapCol="0px"
    >
      {children}
      {renderMessage()}
    </ECGridLayout>
  );
}

export default FormFieldLayout;
