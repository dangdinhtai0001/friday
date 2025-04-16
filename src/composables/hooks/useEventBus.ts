import { useEffect } from "react";
import { EventBusInstance } from "@/composables/lib/EventBus";
import type { Listener } from "@/composables/lib/EventBus";

/**
 * Custom hook to use EventBus within a React component's scope.
 * @param eventName The name of the event to listen to.
 * @param callback The callback function to execute when the event is emitted.
 */
function useEventBus<T = undefined>(
  eventName: string,
  callback: Listener<T>
): void {
  useEffect(() => {
    // Register the listener when the component mounts
    EventBusInstance.on(eventName, callback);

    // Cleanup the listener when the component unmounts
    return () => {
      EventBusInstance.off(eventName, callback);
    };
  }, [eventName, callback]); // Re-run effect if eventName or callback changes
}

export default useEventBus;
