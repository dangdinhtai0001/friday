import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

export type CollapsibleState = {
  /**
   * Trạng thái mở/đóng hiện tại của Collapsible.
   * @default false
   */
  isOpen: boolean;
};

// Định nghĩa các hành động có thể thực hiện trên Collapsible
export type CollapsibleActions = {
  /**
   * Chuyển đổi trạng thái mở/đóng của Collapsible.
   */
  toggle: () => void;
};

// Giá trị của CollapsibleContext
export type CollapsibleContextValue = {
  /**
   * Trạng thái hiện tại của collapsible.
   */
  state: CollapsibleState;
  /**
   * Các hành động để tương tác với collapsible.
   */
  actions: CollapsibleActions;
};

export type CollapsibleProps = React.ComponentProps<
  typeof CollapsiblePrimitive.Root
> & {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};
