import { FieldLayout } from '../context/context.types';

export type FormFieldComponentType =
  | 'label'
  | 'control'
  | 'description'
  | 'message';

// Định nghĩa kiểu dữ liệu cho một vị trí trong lưới
type GridPosition = {
  x: number;
  y: number;
  width?: number; // Có thể có chiều rộng riêng nếu cần span nhiều cột
  height?: number; // Có thể có chiều cao riêng nếu cần span nhiều hàng
};

// Định nghĩa kiểu dữ liệu cho toàn bộ cấu hình vị trí của FormField
type FormFieldLayoutMap = Record<
  FieldLayout,
  Record<FormFieldComponentType, GridPosition>
>;

export const formFieldLayoutMap: FormFieldLayoutMap = {
  vertical: {
    label: { x: 1, y: 1 },
    control: { x: 1, y: 2 },
    description: { x: 1, y: 3 },
    message: { x: 1, y: 4 },
  },
  horizontal: {
    label: { x: 1, y: 1 },
    control: { x: 2, y: 1 },
    description: { x: 2, y: 2 },
    message: { x: 2, y: 3 },
  },
};
