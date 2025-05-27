// src/components/organisms/sidebar2/hooks/use-sidebar-keyboard-shortcut.ts

import React from "react";
import { SIDEBAR_KEYBOARD_SHORTCUT } from "../constants"; // Import hằng số phím tắt
// KHÔNG CẦN IMPORT useSidebarContext NỮA

/**
 * Hook tùy chỉnh để thêm phím tắt bàn phím (Ctrl/Cmd + B) để chuyển đổi sidebar.
 * @param toggleSidebar Hàm để chuyển đổi trạng thái của sidebar.
 */
export function useSidebarKeyboardShortcut(toggleSidebar: () => void) { // NHẬN toggleSidebar TRỰC TIẾP
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar(); // SỬ DỤNG toggleSidebar ĐƯỢC TRUYỀN VÀO
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleSidebar]); // Dependency array chỉ cần toggleSidebar
}