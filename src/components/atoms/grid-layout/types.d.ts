import { HtmlHTMLAttributes } from 'react';

/**
 * @fileoverview Định nghĩa các kiểu TypeScript cho hệ thống Grid Layout.
 * Bao gồm các CSS custom properties (biến CSS) để sử dụng trong các thành phần React,
 * cũng như các interface cho props của GridLayout và GridItem.
 */

// ---

/**
 * Mở rộng giao diện `React.CSSProperties` để bao gồm các CSS custom properties
 * được sử dụng bởi thành phần `GridLayout`.
 *
 * Các biến này cho phép định nghĩa động số lượng cột/hàng và khoảng cách
 * giữa chúng thông qua thuộc tính `style` của React.
 */
declare module 'react' {
  interface CSSProperties {
    /**
     * @property {number} --grid-cols - Định nghĩa số lượng và cấu trúc cột của grid.
     * Thường được sử dụng với giá trị chuỗi như `repeat(6, minmax(0, 1fr))`.
     */
    '--grid-cols'?: string; // Thay đổi từ number thành string để phù hợp với `repeat(...)`
    /**
     * @property {number} --grid-rows - Định nghĩa số lượng và cấu trúc hàng của grid.
     * Thường được sử dụng với giá trị chuỗi như `repeat(6, minmax(0, 1fr))`.
     */
    '--grid-rows'?: string; // Thay đổi từ number thành string để phù hợp với `repeat(...)`
    /**
     * @property {string} --grid-gap-row - Định nghĩa khoảng cách giữa các hàng trong grid.
     * Hỗ trợ các đơn vị CSS (ví dụ: '8px', '1rem') hoặc biến CSS.
     */
    '--grid-gap-row'?: string;
    /**
     * @property {string} --grid-gap-col - Định nghĩa khoảng cách giữa các cột trong grid.
     * Hỗ trợ các đơn vị CSS (ví dụ: '8px', '1rem') hoặc biến CSS.
     */
    '--grid-gap-col'?: string;
    /**
     * @property {number} --grid-item-x - Xác định cột bắt đầu của một GridItem.
     * Sử dụng để điều khiển `grid-column-start`.
     */
    '--grid-item-x'?: number;
    /**
     * @property {number} --grid-item-y - Xác định hàng bắt đầu của một GridItem.
     * Sử dụng để điều khiển `grid-row-start`.
     */
    '--grid-item-y'?: number;
    /**
     * @property {number} --grid-item-width - Xác định số lượng cột mà một GridItem chiếm giữ.
     * Sử dụng để điều khiển `grid-column-end` hoặc `grid-column-span`.
     */
    '--grid-item-width'?: number;
    /**
     * @property {number} --grid-item-height - Xác định số lượng hàng mà một GridItem chiếm giữ.
     * Sử dụng để điều khiển `grid-row-end` hoặc `grid-row-span`.
     */
    '--grid-item-height'?: number;
  }
}

// ---

/**
 * @typedef {object} GridLayoutProps
 * @extends HtmlHTMLAttributes<HTMLDivElement>
 * @property {number} [cols=6] - Số lượng cột của lưới. Mặc định là 6.
 * @property {number | string} [rows=6] - Số lượng hàng của lưới.
 * Có thể là một số (mặc định là 6, sẽ được chuyển thành `repeat(số, minmax(0, auto))`)
 * hoặc một chuỗi định nghĩa Grid Template Rows (ví dụ: `min-content min-content 1fr`).
 * @property {string} [gapRow="8px"] - Khoảng cách giữa các hàng.
 * Có thể là giá trị số (cho Tailwind mặc định)
 * hoặc chuỗi có đơn vị CSS (ví dụ: '16px', '1rem')
 * hoặc biến CSS (ví dụ: 'var(--my-gap)'). Mặc định là '8px'.
 * @property {string} [gapCol="8px"] - Khoảng cách giữa các cột.
 * Tương tự như `gapRow`. Mặc định là '8px'.
 */
type GridLayoutProps = HtmlHTMLAttributes<HTMLDivElement> & {
  cols?: number;
  rows?: number | string;
  gapRow?: string;
  gapCol?: string;
};

// ---

/**
 * @typedef {object} GridItemProps
 * @extends HtmlHTMLAttributes<HTMLDivElement>
 * @property {number} [x] - Vị trí cột bắt đầu của mục lưới.
 * @property {number} [y] - Vị trí hàng bắt đầu của mục lưới.
 * @property {number} [width=1] - Số lượng cột mà mục lưới sẽ chiếm giữ. Mặc định là 1.
 * @property {number} [height=1] - Số lượng hàng mà mục lưới sẽ chiếm giữ. Mặc định là 1.
 */
type GridItemProps = HtmlHTMLAttributes<HTMLDivElement> & {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};
