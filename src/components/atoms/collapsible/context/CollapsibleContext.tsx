import React from "react";
// Đảm bảo đường dẫn này đúng với vị trí file types của bạn
import { CollapsibleContextValue } from "../types"; 

/**
 * Tạo một React Context cho Collapsible.
 * Giá trị mặc định là `undefined`, và sẽ được cung cấp bởi component Collapsible cha.
 */
export const CollapsibleContext = React.createContext<
  CollapsibleContextValue | undefined
>(undefined);

/**
 * Custom hook để truy cập vào Collapsible Context.
 * Nó sẽ ném lỗi nếu không được sử dụng bên trong component Collapsible.
 * @returns {CollapsibleContextValue} Giá trị của collapsible context.
 * @throws {Error} Nếu không được sử dụng bên trong component Collapsible.
 */
export function useCollapsibleContext() {
  const context = React.useContext(CollapsibleContext);

  if (context === undefined) { // Kiểm tra undefined thay vì null vì giá trị mặc định là undefined
    throw new Error("useCollapsibleContext must be used within a Collapsible component.");
  }
  return context;
}