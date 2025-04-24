import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dialog,
  DialogDescription,
} from "@/components/atoms/dialog";
import { Button } from "@/components/atoms/button";
import { ButtonDialogProps } from "./types";
import { useState } from "react";
import { Spinner } from "@/components/atoms/loader";

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
        <DialogFooter>
          {footerButtons?.map((button, index) => (
            <Button
              key={index}
              variant={button.variant}
              className={button.className}
              onClick={() => handleExecuteCommand(button.command)}
              disabled={isLoading || button.disabled}
            >
              <div className="flex items-center gap-2">
                {(isLoading && executeCommand === button.command) ? (
                  <Spinner className="w-16 h-16" />
                ) : null}
                {button.label}
              </div>
            </Button>
          ))}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

ButtonDialog.displayName = "ButtonDialog";
export default ButtonDialog;
