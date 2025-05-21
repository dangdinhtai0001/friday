import { useState } from "react";

// Import các types đã định nghĩa
import {
  CollapsibleState,
  CollapsibleActions,
  CollapsibleContextValue,
  CollapsibleProps,
} from "../types";
import { CollapsibleContext } from "./CollapsibleContext";

function CollapsibleProvider({
  children,
  open: controlledOpen,
  defaultOpen,
  onOpenChange,
}: CollapsibleProps) {
  // Quản lý trạng thái mở/đóng
  const [uncontrolledOpen, setUncontrolledOpen] = useState(
    defaultOpen || false,
  );
  const isOpen =
    controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  // Hàm để thay đổi trạng thái mở
  const handleOpenChange = (newOpenState: boolean) => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(newOpenState);
    }
    onOpenChange?.(newOpenState);
  };

  const toggle = () => handleOpenChange(!isOpen);

  // Tạo đối tượng state và actions để truyền vào context
  const collapsibleState: CollapsibleState = {
    isOpen,
  };

  const collapsibleActions: CollapsibleActions = {
    toggle,
  };

  const contextValue: CollapsibleContextValue = {
    state: collapsibleState,
    actions: collapsibleActions,
  };

  // return (
  //   <CollapsiblePrimitive.Root
  //     data-slot="collapsible"
  //     open={isOpen}
  //     onOpenChange={handleOpenChange}
  //     {...props}
  //   >
  //     {/* Đây chính là nơi Collapsible đóng vai trò là Provider */}
  //     <CollapsibleContext.Provider value={contextValue}>
  //       {children}
  //     </CollapsibleContext.Provider>
  //   </CollapsiblePrimitive.Root>
  // );

  return (
    <CollapsibleContext.Provider value={contextValue}>
      {children}
    </CollapsibleContext.Provider>
  );
}

export default CollapsibleProvider;
