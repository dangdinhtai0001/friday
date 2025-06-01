//  #region FormContainerContext
export type FormStatus = 'idle' | 'loading';
export type FieldControlState = {
  message?: string;
  messageType?: 'error' | 'warning' | 'info' | 'success';
  disabled?: boolean;
  readOnly?: boolean;
};

export type FormContainerState = {
  id: string;
  status: FormStatus;
  fieldStates: { [fieldName: string]: FieldControlState };
};

export type FormContainerActions = {
  setStatus: (status: FormStatus) => void;
  setFieldState: (
    fieldName: string,
    newState: Partial<FieldControlState>,
  ) => void;
  setFieldMessage: (
    fieldName: string,
    message?: string, // Nội dung tin nhắn (có thể là undefined để xóa)
    messageType?: FieldControlState['messageType'], // Loại tin nhắn (error, warning, info, success)
  ) => void;
};

export type FormContainerContextValue = {
  state: FormContainerState;
  actions: FormContainerActions;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FromContainerProviderProps {}

// #endregion

// #region FormFieldContext

/**
 * Định nghĩa vị trí của label so với control.
 * - 'top': Label nằm phía trên control.
 * - 'left': Label nằm bên trái control.
 */
export type FieldLayout = 'horizontal' | 'vertical';

export type FormFieldState = {
  id: string;
  controlId: string;
  fieldName: string;
  fieldLayout?: FieldLayout;
  hasDescription: boolean;
  hasMessage: boolean;
};
export type FormFieldActions = {
  setShowDescription: (show: boolean) => void;
  setShowMessage: (show: boolean) => void;
};

export type FormFieldContextValue = {
  state: FormFieldState;
  actions: FormFieldActions;
};

export interface FormFieldProviderProps {
  name: string;
  fieldLayout: FieldLayout;
}

// #endregion
