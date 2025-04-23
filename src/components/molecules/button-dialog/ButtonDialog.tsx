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

function ButtonDialog({
  label,
  title,
  triggerClassName,
  footerButtons,
  onExecuteCommand,
}: ButtonDialogProps) {
  return (
    <Dialog>
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
        <div>This is form</div>

        {/* Footer */}
        <DialogFooter>
          {footerButtons?.map((button, index) => (
            <Button
              key={index}
              variant={button.variant}
              className={button.className}
              onClick={() => onExecuteCommand?.(button.command)}
              disabled={button.disabled}
            >
              {button.label}
            </Button>
          ))}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

ButtonDialog.displayName = "ButtonDialog";
export default ButtonDialog;
