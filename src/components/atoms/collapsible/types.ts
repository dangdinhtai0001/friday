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

// Định nghĩa kiểu cho props của CollapsibleTrigger
export type CollapsibleTriggerProps = React.ComponentProps<
  typeof CollapsiblePrimitive.CollapsibleTrigger
> & {
  /**
   * Quyết định có hiển thị icon hay không. Mặc định là true.
   */
  showIcon?: boolean;
  /**
   * Vị trí của icon: "start" (đầu) hoặc "end" (cuối). Mặc định là "end".
   */
  iconPosition?: "start" | "end";
  /**
   * Tên của icon khi sử dụng IconLoader. Mặc định là "chevron-right".
   */
  iconName?: string;
  /**
   * Component hoặc ReactNode tùy chỉnh để sử dụng làm icon, sẽ ưu tiên hơn iconName.
   */
  customIcon?: React.ReactNode;
  /**
   * Kích hoạt animation xoay cho icon khi trạng thái Collapsible thay đổi. Mặc định là true.
   */
  enableIconAnimation?: boolean; // Đổi tên biến để rõ ràng hơn
};