import { useState, useEffect, useRef, useMemo } from "react";

/**
 * Custom hook to calculate the height and width of an element.
 * @returns An object containing the ref to attach to the element,
 *          and the current dimensions (height and width).
 */
function useElementDimensions() {
  // State to store the dimensions for rendering
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  // Reference to the DOM element
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Ensure the ref is attached to a valid DOM element
    if (!ref.current) return;

    const element = ref.current;

    // Function to update the dimensions in state
    const updateDimensions = () => {
      const newWidth = element.offsetWidth;
      const newHeight = element.offsetHeight;

      // Only update state if dimensions have changed
      if (newWidth !== dimensions.width || newHeight !== dimensions.height) {
        setDimensions({ width: newWidth, height: newHeight });
      }
    };

    // Initial dimensions calculation
    updateDimensions();

    // Use ResizeObserver to track size changes
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(element);

    // Cleanup function to stop observing when the component unmounts
    return () => {
      resizeObserver.unobserve(element);
    };
  }, [dimensions]); // Add dimensions to dependency array to ensure consistency

  // Memoize the returned object to prevent unnecessary re-renders
  return useMemo(() => ({ ref, ...dimensions }), [dimensions]);
}

export default useElementDimensions;