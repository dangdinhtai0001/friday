import React from "react";
import { Responsive, WidthProvider, ResponsiveProps } from "react-grid-layout";
import type { FlexibleLayoutProps } from "./types";

// Sử dụng WidthProvider để tự động điều chỉnh chiều rộng
const ResponsiveGridLayout = WidthProvider(Responsive);

const FlexibleLayout: React.FC<FlexibleLayoutProps> = ({
  children,
  ...restProps
}) => {
  // Định nghĩa các giá trị mặc định
  const defaultProps: Partial<ResponsiveProps> = {
    className: "custom-grid-layout", // Class CSS mặc định
    rowHeight: 30, // Chiều cao của mỗi hàng
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }, // Số cột cho từng breakpoint
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }, // Breakpoints responsive
    margin: [10, 10] as [number, number], // Khoảng cách giữa các item
    containerPadding: [10, 10] as [number, number], // Padding của container
    isDraggable: false, // Cho phép kéo thả mặc định
    isResizable: false, // Cho phép thay đổi kích thước mặc định
    useCSSTransforms: true, // Sử dụng CSS transforms để tối ưu hiệu năng
  };

  // Gộp props được truyền vào với giá trị mặc định
  const mergedProps: ResponsiveProps = { ...defaultProps, ...restProps };

  return (
    <ResponsiveGridLayout {...mergedProps}>{children}</ResponsiveGridLayout>
  );
};

export default FlexibleLayout;
