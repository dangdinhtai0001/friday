import { type VariantProps } from "class-variance-authority";

// Configuration for each button in the footer
export interface FooterButtonConfig {
  label: string; // Text displayed on the button
  command: string; // Action identifier (e.g., "submit", "cancel")
  variant?: VariantProps<typeof buttonVariants>["variant"]; // Button style variant
  className?: string; // Custom class name for the button
  disabled?: boolean; // Whether the button is disabled
}

export interface ButtonDialogCommand {
  command: string;
  setIsOpen?: (isOpen: boolean) => void; // setter for controlling the dialog's open state
  setIsLoading?: (isLoading: boolean) => void; // setter for controlling the dialog's loading state
}

// Props for the ButtonDialog component
export interface ButtonDialogProps {
  label?: string; // Label for the trigger button
  title?: string; // Title of the dialog
  triggerClassName?: string; // Custom class name for the trigger button
  footerButtons?: FooterButtonConfig[]; // List of buttons in the footer
  onExecuteCommand?: (command: ButtonDialogCommand) => Promise<void> | void;
  children?: React.ReactNode; // Content to be displayed inside the dialog
}
