import { Path, FieldValues } from "react-hook-form";

export interface FieldControllerProps<T extends FieldValues> {
    name: Path<T>; // Tên field, sử dụng Path<T> để đảm bảo tên hợp lệ trong T
    label: string;
    layout?: 'horizontal' | 'vertical'; // Hỗ trợ layout hàng ngang hoặc hàng dọc
    hint?: string; // Hint text
    hintType?: 'info' | 'warning' | 'error'; // Loại hint (để thay đổi màu sắc)
    labelAlign?: 'left' | 'center' | 'right'; // Căn chỉnh nội dung của label
    labelWidth?: string; // Chiều rộng cố định hoặc tối thiểu cho label
    hintDisplayMode?: 'ellipsis' | 'full'; // Chế độ hiển thị hint message
    children: React.ReactNode; // Children để thay thế input
  }