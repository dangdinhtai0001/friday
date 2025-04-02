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
        Object.assign(
          result,
          flattenErrors(value as FieldErrors, fullKey)
        );
      }
    },
    {} as Record<string, FieldError | undefined>
  );
}
