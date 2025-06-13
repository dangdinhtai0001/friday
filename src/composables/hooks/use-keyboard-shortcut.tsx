import { useEffect, useCallback } from 'react';

/**
 * @interface KeyboardShortcut
 * @description Defines the structure for a keyboard shortcut configuration.
 * @property {string[]} keys - An array of keys that must be pressed to trigger the shortcut (e.g., ['Control', 'k'], ['Escape']).
 * @property {(event: KeyboardEvent) => void} callback - The function to be executed when the keyboard shortcut is activated.
 * @property {boolean} [preventDefault] - Optional. If true, `event.preventDefault()` will be called to stop the browser's default behavior for the shortcut.
 */
export interface KeyboardShortcut {
  keys: string[]; // Example: ['Control', 'Shift', 'A'], ['Escape'], ['Enter']
  callback: (event: KeyboardEvent) => void;
  preventDefault?: boolean;
}

/**
 * @function useKeyboardShortcut
 * @description A custom React hook for listening to and handling global keyboard shortcuts.
 * It allows you to define multiple shortcuts, each with a specific key combination and a callback function.
 *
 * @param {KeyboardShortcut[]} shortcuts - An array of `KeyboardShortcut` objects, where each object defines a key combination and its corresponding callback function.
 *
 * @example
 * // Example usage in a functional component:
 * import React from 'react';
 * import useKeyboardShortcut from './useKeyboardShortcut'; // Assuming your hook file is named useKeyboardShortcut.ts
 *
 * function MyComponent() {
 * useKeyboardShortcut([
 * {
 * keys: ['Control', 'k'],
 * callback: () => {
 * console.log('Ctrl + K pressed!');
 * // Perform some action, like opening a search bar
 * },
 * preventDefault: true,
 * },
 * {
 * keys: ['Escape'],
 * callback: () => {
 * console.log('Escape pressed!');
 * // Perform some action, like closing a modal
 * },
 * },
 * ]);
 *
 * return (
 * <div>
 * Press Ctrl + K or Escape!
 * </div>
 * );
 * }
 *
 * export default MyComponent;
 */
function useKeyboardShortcut(shortcuts: KeyboardShortcut[]): void {
  /**
   * @function handleKeyDown
   * @description Memoized event handler for the 'keydown' event.
   * It determines which keys are currently pressed and checks if they match any defined shortcuts.
   * Uses `useCallback` to prevent unnecessary re-creations, improving performance.
   * @param {KeyboardEvent} event - The keyboard event object.
   */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Normalize pressed keys to lowercase for case-insensitive comparison.
      const pressedKeys = new Set<string>();
      if (event.key) pressedKeys.add(event.key.toLowerCase());
      if (event.ctrlKey) pressedKeys.add('control');
      if (event.altKey) pressedKeys.add('alt');
      if (event.shiftKey) pressedKeys.add('shift');
      if (event.metaKey) pressedKeys.add('meta'); // Command key on Mac, Windows key on Windows

      for (const shortcut of shortcuts) {
        // Normalize shortcut keys to lowercase for comparison.
        const shortcutKeysLower = shortcut.keys.map(key => key.toLowerCase());

        // Check if all keys in the shortcut are currently pressed.
        const allKeysMatch = shortcutKeysLower.every(key => pressedKeys.has(key));
        // Ensure no extra keys are pressed beyond those defined in the shortcut.
        const noExtraKeys = pressedKeys.size === shortcutKeysLower.length;

        if (allKeysMatch && noExtraKeys) {
          if (shortcut.preventDefault) {
            event.preventDefault(); // Prevent default browser behavior (e.g., F5, Ctrl+S)
          }
          shortcut.callback(event); // Execute the shortcut's callback function.
          return; // Exit after the first matching shortcut is found and executed.
        }
      }
    },
    [shortcuts], // Dependency array: `handleKeyDown` re-creates only if `shortcuts` changes.
  );

  /**
   * @function useEffect
   * @description Sets up and tears down the global 'keydown' event listener.
   * It ensures the listener is added when the component mounts and removed when it unmounts
   * or when `handleKeyDown` (due to `shortcuts` changing) re-creates.
   */
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function: remove the event listener when the component unmounts.
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]); // Dependency array: Effect re-runs only if `handleKeyDown` changes.
}

export default useKeyboardShortcut;