export type Listener<T = undefined> = (payload: T) => void;

class EventBus {
  private listeners: Record<string, Array<Listener<unknown>>> = {};

  /**
   * Register a listener for an event.
   * @param eventName The name of the event to listen to.
   * @param callback The callback function to execute when the event is emitted.
   */
  on<T = undefined>(eventName: string, callback: Listener<T>): void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback as Listener<unknown>);
  }

  /**
   * Emit an event with a payload.
   * @param eventName The name of the event to emit.
   * @param payload The payload to pass to the event listeners.
   */
  emit<T = undefined>(eventName: string, payload?: T): void {
    const callbacks = this.listeners[eventName];
    if (callbacks) {
      callbacks.forEach((callback) => {
        // Safely cast the callback and handle undefined payloads
        (callback as Listener<T | undefined>)(payload);
      });
    }
  }

  /**
   * Unregister a listener for an event.
   * @param eventName The name of the event to unregister from.
   * @param callbackToRemove The specific callback function to remove.
   */
  off<T = undefined>(eventName: string, callbackToRemove: Listener<T>): void {
    const callbacks = this.listeners[eventName];
    if (callbacks) {
      this.listeners[eventName] = callbacks.filter(
        (callback) => callback !== (callbackToRemove as Listener<unknown>)
      );
    }
  }
}

// Export a singleton instance of EventBus
export const EventBusInstance = new EventBus();