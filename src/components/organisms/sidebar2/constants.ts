// src/components/organisms/sidebar2/constants.ts

/**
 * Tên của cookie được sử dụng để lưu trạng thái mở/đóng của sidebar.
 */
export const SIDEBAR_COOKIE_NAME = "sidebar_state";

/**
 * Thời gian tồn tại tối đa của cookie trạng thái sidebar (tính bằng giây).
 * (Ví dụ: 7 ngày = 60 giây * 60 phút * 24 giờ * 7 ngày)
 */
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

/**
 * Chiều rộng mặc định của sidebar khi ở trạng thái mở rộng (expanded).
 */
export const SIDEBAR_EXPANDED_WIDTH = "212px";

/**
 * Chiều rộng của sidebar trên thiết bị di động.
 */
export const SIDEBAR_WIDTH_MOBILE = "18rem";

/**
 * Chiều rộng mặc định của sidebar khi ở trạng thái thu gọn chỉ còn biểu tượng (icon).
 */
export const SIDEBAR_COLLAPSED_WIDTH = "3rem";

/**
 * Phím tắt (shortcut) để chuyển đổi trạng thái của sidebar.
 * (Ví dụ: 'b' cho Ctrl/Cmd + B)
 */
export const SIDEBAR_KEYBOARD_SHORTCUT = "b";

/**
 * Thời gian chuyển động mặc định cho sidebar và các thành phần liên quan (tính bằng giây).
 */
export const SIDEBAR_TRANSITION_DURATION = 0.2; // 0.2 giây