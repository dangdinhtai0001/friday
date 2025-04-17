import { useEffect } from 'react';

type EventHandler = (...args: unknown[]) => void;

function useEventListeners(
    eventHandlers: Record<string, EventHandler>, // Object with eventName as keys and handlers as values
    eventBus: {
        on: (eventName: string, handler: EventHandler) => void;
        off: (eventName: string, handler: EventHandler) => void;
    }
) {
    useEffect(() => {
        // Attach event listeners
        Object.entries(eventHandlers).forEach(([eventName, handler]) => {
            eventBus.on(eventName, handler);
        });

        // Cleanup function to remove event listeners
        return () => {
            Object.entries(eventHandlers).forEach(([eventName, handler]) => {
                eventBus.off(eventName, handler);
            });
        };
    }, [eventHandlers, eventBus]); // Re-run effect if eventHandlers or eventBus changes
}

export default useEventListeners;