import { Button } from "@/components/atoms/button";
import { ButtonTriggerProps } from "../types";
import { EventBusInstance } from "@/composables/lib/EventBus";
import { resolveEventName } from "../Utils";
import { useDataViewContext } from "../context/DataViewContext";
import { useState } from "react";
import { Spinner } from "@/components/atoms/loader";
import { cn } from "@/composables/lib/utils";

function ButtonTrigger({
  label,
  variant,
  eventName,
  className,
}: ButtonTriggerProps) {
  const { state } = useDataViewContext();

  const [isLoading, setIsLoading] = useState(false);

  const handleTrigger = () => {
    EventBusInstance.emit(resolveEventName(eventName || "", state.id), { setIsLoading });
  };
  return (
    <Button className={cn(className, "w-full h-full")} variant={variant} onClick={handleTrigger} disabled={isLoading}>
      <div className="flex items-center gap-2">
        {isLoading ? <Spinner className="w-12 h-12" /> : null} {label}
      </div>
    </Button>
  );
}

ButtonTrigger.displayName = "ButtonTrigger";
export default ButtonTrigger;
