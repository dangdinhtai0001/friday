import { useDataViewContext } from "../context/DataViewContext";
import { DialogTriggerProps } from "../types";
import { ButtonDialog } from "@/components/molecules/button-dialog";
import { EventBusInstance } from "@/composables/lib/EventBus";
import { resolveEventName } from "../Utils";

function DialogTrigger({
  label,
  title,
  triggerClassName,
  footerButtons,
  eventName,
}: DialogTriggerProps) {
  const { state } = useDataViewContext();

  const handleTrigger = (command: string) => {
    EventBusInstance.emit(resolveEventName(eventName || "", state.id), {
      command,
    });
  };
  return (
    <>
      <ButtonDialog
        label={label}
        title={title}
        triggerClassName={triggerClassName}
        footerButtons={footerButtons}
        onExecuteCommand={handleTrigger}
      />
    </>
  );
}

DialogTrigger.displayName = "DialogTrigger";
export default DialogTrigger;
