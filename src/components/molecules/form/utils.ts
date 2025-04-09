import { transform } from "lodash-es";
import { FieldError, FieldErrors, FieldValues } from "react-hook-form";

function isFieldError(value: unknown): value is FieldError {
  return typeof value === "object" && value !== null && "message" in value;
}

export function flattenErrors<T extends FieldValues>(
  errors: FieldErrors<T>,
  parentKey = ""
): Record<string, FieldError | undefined> {
  return transform(
    errors,
    (result, value, key) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      if (isFieldError(value)) {
        // Base case: This is a FieldError
        result[fullKey] = value;
      } else if (typeof value === "object" && value !== null) {
        // Recursive case: This is a nested object
        Object.assign(result, flattenErrors(value as FieldErrors, fullKey));
      }
    },
    {} as Record<string, FieldError | undefined>
  );
}

/**
 * Function to generate a scoped event name.
 * @param id The unique identifier for the scope (e.g., form ID).
 * @param name The specific name of the event (e.g., "valueChange").
 * @returns A scoped event name (e.g., "form:form-1:valueChange").
 */
export function resolveEventName(name: string, id: string): string {
  return `${name}(${id})`;
}
