import type { Filter, FilterOperator } from "./types";
import { FILTER_OPERATORS } from "./types.d";

/**
 * Validates whether an unknown object conforms to the `Filter` interface.
 * @param filter - The object to validate.
 * @returns True if the object is a valid `Filter`, false otherwise.
 */
export function isValidFilter(filter: unknown): filter is Filter {
  // Ensure the input is a non-null object
  if (typeof filter !== "object" || filter === null) {
    return false;
  }

  // Type-cast the object for easier property access
  const f = filter as Record<string, unknown>;

  // Validate required properties
  const hasValidId = typeof f.id === "string";
  const hasValidName = typeof f.name === "string";
  const hasValidValue = typeof f.value === "string";
  const hasValidOperator =
    typeof f.operator === "string" &&
    Object.values(FILTER_OPERATORS).includes(f.operator as FilterOperator);

  // Return true only if all properties are valid
  return hasValidId && hasValidName && hasValidValue && hasValidOperator;
}

/**
 * Function to generate a scoped event name.
 * @param id The unique identifier for the scope (e.g., form ID).
 * @param name The specific name of the event (e.g., "valueChange").
 * @returns A scoped event name (e.g., "form:form-1:valueChange").
 */
export function resolveEventName(name: string, id: string): string {
    return `data-view:${id}:${name}`;
  }
