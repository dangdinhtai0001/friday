// src/components/organisms/sidebar2/hooks/use-sidebar-state.ts

import React from "react";
import { getCookie, setCookie } from "../utils";
import { SIDEBAR_COOKIE_NAME, SIDEBAR_COOKIE_MAX_AGE } from "../constants";

/**
 * Hook tùy chỉnh để quản lý trạng thái mở của sidebar, bao gồm việc đọc/ghi vào cookie.
 * @param defaultOpen Giá trị mặc định cho trạng thái mở nếu không có trong cookie.
 * @param onOpenChange Callback được gọi khi trạng thái mở thay đổi.
 * @returns {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} Một tuple chứa trạng thái mở hiện tại và hàm setter.
 */
export function useSidebarState(
  defaultOpen?: boolean,
  onOpenChange?: (open: boolean) => void,
): [boolean, (value: boolean | ((value: boolean) => boolean)) => void] {
  // Lấy trạng thái open ban đầu từ cookie hoặc sử dụng giá trị mặc định
  const initialOpenState = React.useMemo(() => {
    const cookieState = getCookie(SIDEBAR_COOKIE_NAME);

    if (defaultOpen !== undefined && defaultOpen !== null) {
      return defaultOpen;
    }

    if (cookieState !== undefined && cookieState !== null) {
      return cookieState === "true";
    }

    return true;
  }, [defaultOpen]);

  // State nội bộ cho trạng thái mở của sidebar
  const [_open, _setOpen] = React.useState<boolean>(initialOpenState);

  // Hàm setter được tùy chỉnh để cập nhật cookie và gọi callback
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      // Tính toán giá trị mới của trạng thái mở
      const newOpenState = typeof value === "function" ? value(_open) : value;

      // Cập nhật state nội bộ
      _setOpen(newOpenState);

      // Gọi callback nếu có
      if (onOpenChange) {
        onOpenChange(newOpenState);
      }

      // Ghi trạng thái mới vào cookie
      setCookie(SIDEBAR_COOKIE_NAME, newOpenState, SIDEBAR_COOKIE_MAX_AGE);
    },
    [_open, onOpenChange],
  );

  return [_open, setOpen];
}
