export type ControlledProps = {
  onChange?: (value: unknown) => void;
  onBlur?: () => void;
  value?: unknown;
  disabled?: boolean;
  name?: boolean;
  ref?: React.Ref<unknown>;
};
