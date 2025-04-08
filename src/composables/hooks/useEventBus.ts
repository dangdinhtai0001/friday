import { useState } from "react";

/**
 * EventBus Class
 * 
 * A generic event bus implementation that allows components to communicate via events.
 * It supports subscribing, emitting, and unsubscribing to events with type-safe payloads.
 * 
 * @template Payload - The type of the payload for the event callbacks. Defaults to `unknown`.
 */
class EventBus<Payload = unknown> {
  /**
   * Internal storage for event listeners.
   * 
   * This is a dictionary where:
   * - Keys are event names (strings).
   * - Values are arrays of callback functions that will be executed when the event is emitted.
   */
  private listeners: Record<string, Array<(payload?: Payload) => void>> = {};

  /**
   * Subscribes a callback function to a specific event.
   * 
   * @param eventName - The name of the event to subscribe to.
   * @param callback - The callback function to execute when the event is emitted.
   *                   The callback can optionally accept a payload of type `Payload`.
   */
  on(eventName: string, callback: (payload?: Payload) => void): void {
    // Initialize the listener array if it doesn't exist for the given event name.
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    // Add the callback to the listener array for the event.
    this.listeners[eventName].push(callback);
  }

  /**
   * Emits an event, triggering all subscribed callbacks for the event.
   * 
   * @param eventName - The name of the event to emit.
   * @param payload - Optional data to pass to the subscribed callbacks.
   */
  emit(eventName: string, payload?: Payload): void {
    // Retrieve the list of callbacks for the given event name.
    const callbacks = this.listeners[eventName];
    if (callbacks) {
      // Execute each callback with the provided payload.
      callbacks.forEach((callback) => callback(payload));
    }
  }

  /**
   * Unsubscribes a specific callback function from a given event.
   * 
   * @param eventName - The name of the event to unsubscribe from.
   * @param callbackToRemove - The specific callback function to remove from the event's listeners.
   */
  off(eventName: string, callbackToRemove: (payload?: Payload) => void): void {
    // Retrieve the list of callbacks for the given event name.
    const callbacks = this.listeners[eventName];
    if (callbacks) {
      // Remove the specified callback from the listener array.
      this.listeners[eventName] = callbacks.filter(
        (callback) => callback !== callbackToRemove
      );
    }
  }
}

/**
 * React Hook: useEventBus
 * 
 * Provides an instance of the EventBus class within a React component.
 * Ensures that the EventBus instance persists across renders using React's `useState`.
 * 
 * @template Payload - The type of the payload for the event callbacks. Defaults to `unknown`.
 * @returns An instance of the EventBus class with the specified payload type.
 */
export const useEventBus = <Payload = unknown>() => {
  // Create and persist an instance of EventBus using React's `useState`.
  const [eventBus] = useState(new EventBus<Payload>());
  return eventBus;
};