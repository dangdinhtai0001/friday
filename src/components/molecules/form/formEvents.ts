export enum FormEventNames {
  VALUE_CHANGE = "valueChange",
}

export interface FormEventPayload {
  [FormEventNames.VALUE_CHANGE]: { field: string; value: unknown };
}
