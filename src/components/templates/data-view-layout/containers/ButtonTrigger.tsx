import { Button } from "@/components/atoms/button";
import { ButtonTriggerProps } from "../types";
import { EventBusInstance } from "@/composables/lib/EventBus";
import { resolveEventName } from "../Utils";
import { useDataViewContext } from "../context/DataViewContext";

function ButtonTrigger({
  label,
  variant,
  eventName,
  className,
}: ButtonTriggerProps) {
  const { state } = useDataViewContext();

  const handleTrigger = () => {
    EventBusInstance.emit(resolveEventName(eventName || "", state.id), {});
  };
  return (
    <Button className={className} variant={variant} onClick={handleTrigger}>
      {label}
    </Button>
  );
}

ButtonTrigger.displayName = "ButtonTrigger";
export default ButtonTrigger;
