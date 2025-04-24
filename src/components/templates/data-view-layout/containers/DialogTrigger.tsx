import { useDataViewContext } from "../context/DataViewContext";
import { DialogTriggerProps } from "../types";
import { ButtonDialog } from "@/components/molecules/button-dialog";
import { EventBusInstance } from "@/composables/lib/EventBus";
import { resolveEventName } from "../Utils";
import { type ButtonDialogCommand } from "@/components/molecules/button-dialog";
import { cn } from "@/composables/lib/utils";

function DialogTrigger({
  label,
  title,
  triggerClassName,
  footerButtons,
  eventName,
  children,
}: DialogTriggerProps) {
  const { state } = useDataViewContext();

  const handleTrigger = (command: ButtonDialogCommand): Promise<void> | void => {
    EventBusInstance.emit(resolveEventName(eventName || "", state.id), command);
  };

  return (
    <>
      <ButtonDialog
        label={label}
        title={title}
        triggerClassName={cn(triggerClassName, "w-full h-full")}
        footerButtons={footerButtons}
        onExecuteCommand={handleTrigger}
      >
        {children}
      </ButtonDialog>
    </>
  );
}

DialogTrigger.displayName = "DialogTrigger";
export default DialogTrigger;
