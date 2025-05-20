import React from "react";
import { SidebarContextValue } from "../types"; // Import các kiểu đã định nghĩa

/**
 * Tạo một React Context cho Sidebar.
 * Giá trị mặc định là `undefined`, và sẽ được cung cấp bởi `SidebarProvider`.
 */
export const SidebarContext = React.createContext<
  SidebarContextValue | undefined
>(undefined);

/**
 * Custom hook để truy cập vào Sidebar Context.
 * Nó sẽ ném lỗi nếu không được sử dụng bên trong `SidebarProvider`.
 * @returns {SidebarContextValue} Giá trị của sidebar context.
 * @throws {Error} Nếu không được sử dụng bên trong `SidebarProvider`.
 */
export function useSidebarContext() {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider.");
  }
  return context;
}