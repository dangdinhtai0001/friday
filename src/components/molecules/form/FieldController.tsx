import React from 'react';
import { useController, FieldValues } from 'react-hook-form';
import { FieldControllerProps } from './types/field.d';

const FieldController = <T extends FieldValues>({
  name,
  label,
  layout = 'vertical', // Default là vertical
  hint,
  hintType = 'info',
  labelAlign = 'right', // Mặc định căn phải
  labelWidth = '120px', // Chiều rộng mặc định cho label
  hintDisplayMode = 'ellipsis', // Mặc định là ellipsis
  children,
}: FieldControllerProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController<T>({ name });

  // Xác định màu sắc cho hint dựa trên hintType
  const hintColorClass = {
    info: 'text-blue-500',
    warning: 'text-yellow-500',
    error: 'text-red-500',
  }[hintType];

  // Xác định class căn chỉnh nội dung của label
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[labelAlign];

  // Class Tailwind cho hint message
  const hintClass = {
    ellipsis: 'truncate', // Tắt đuôi với dấu ba chấm
    full: '', // Không tắt đuôi
  }[hintDisplayMode];

  // Tính toán khoảng cách từ lề trái của label đến lề trái của hint message
  const marginLeftForHint = layout === 'horizontal'
    ? `calc(${labelWidth} + 1rem)` // 1rem ~ space-x-4 (khoảng cách giữa label và input)
    : undefined;

  return (
    <div className="flex flex-col space-y-2">
      {/* Container chính chứa label và input */}
      <div
        className={`${
          layout === 'horizontal'
            ? 'flex items-center space-x-4' // Layout horizontal với label và input căn giữa theo chiều dọc
            : 'flex flex-col space-y-2' // Layout vertical
        }`}
      >
        {/* Label */}
        <label
          htmlFor={name.toString()}
          className={`font-medium text-gray-700 ${alignClass} pr-2 ${
            layout === 'horizontal' ? 'shrink-0 self-center' : '' // Thêm self-center để căn giữa theo chiều dọc
          }`}
          style={{
            minWidth: labelWidth, // Sử dụng style inline để thiết lập chiều rộng
          }}
        >
          {label}
        </label>

        {/* Input và Error Circle */}
        <div className="relative w-full">
          {/* Render children và truyền props field vào */}
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { ...field });
            }
            return child;
          })}
          {/* Vòng tròn đỏ khi có lỗi */}
          {error && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
          )}
        </div>
      </div>

      {/* Error Message và Hint Message */}
      <div
        className="flex flex-col space-y-1"
        style={{
          marginLeft: marginLeftForHint, // Đẩy hint message vào lề trái bằng tổng khoảng cách
        }}
      >
        {error && (
          <p
            className="text-red-500 text-sm animate-shake"
            style={{ animationDuration: '0.5s' }}
          >
            {error.message}
          </p>
        )}

        {hint && (
          <p
            className={`text-sm ${hintColorClass} ${hintClass}`}
            title={hintDisplayMode === 'ellipsis' ? hint : undefined} // Tooltip khi ellipsis
          >
            {hint}
          </p>
        )}
      </div>
    </div>
  );
};

export default FieldController;