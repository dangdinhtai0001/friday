import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dialog,
  DialogDescription,
} from "@/components/molecules/dialog";
import { Button } from "@/components/atoms/button";
import { ButtonDialogProps } from "./types";
import { useState } from "react";
import { BusyButton } from "@/components/molecules/busy-button";

function ButtonDialog({
  label,
  title,
  triggerClassName,
  footerButtons,
  children,
  onExecuteCommand,
}: ButtonDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [executeCommand, setExecuteCommand] = useState<string | null>(null);

  const handleExecuteCommand = async (command: string) => {
    setExecuteCommand(command);
    await onExecuteCommand?.({ command, setIsOpen, setIsLoading });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button className={triggerClassName}>{label}</Button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent>
        {/* Header */}
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden"></DialogDescription>

        {/* Main Content */}
        {children}

        {/* Footer */}
        <DialogFooter className="flex justify-end gap-2">
          {footerButtons?.map((button, index) => (
            <BusyButton
              key={index}
              variant={button.variant}
              className={button.className}
              onClick={() => handleExecuteCommand(button.command)}
              disabled={isLoading || button.disabled}
              isLoading={isLoading && executeCommand === button.command}
            >
              {button.label}
            </BusyButton>
          ))}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

ButtonDialog.displayName = "ButtonDialog";
export default ButtonDialog;
