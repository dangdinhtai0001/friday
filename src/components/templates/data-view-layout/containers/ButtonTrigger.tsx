import { Button } from "@/components/atoms/button";
import { ButtonTriggerProps } from "../types";
import { EventBusInstance } from "@/composables/lib/EventBus";
import { resolveEventName } from "../Utils";
import { useDataViewContext } from "../context/DataViewContext";
import { useState } from "react";
import { Spinner } from "@/components/atoms/loader";
import { cn } from "@/composables/lib/utils";
import { BusyButton } from "@/components/molecules/busy-button";

function ButtonTrigger({
  label,
  variant,
  eventName,
  className,
}: ButtonTriggerProps) {
  const { state } = useDataViewContext();

  const [isLoading, setIsLoading] = useState(false);

  const handleTrigger = () => {
    EventBusInstance.emit(resolveEventName(eventName || "", state.id), {
      setIsLoading,
    });
  };
  return (
    <BusyButton
      isLoading={isLoading}
      className={cn(className)}
      variant={variant}
      onClick={handleTrigger}
      disabled={isLoading}
    >
      {label}
    </BusyButton>
  );
}

ButtonTrigger.displayName = "ButtonTrigger";
export default ButtonTrigger;
