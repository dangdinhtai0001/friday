import { FieldState } from "./field.d";
import { FormLayout } from "./form.d";

type FormStatus = "idle" | "loading";
type SubmitStatus = "success" | "failure" | null;

export interface FormState<T = unknown> {
  formId?: string;
  status: FormStatus;
  submitCount: number;
  lastSubmitStatus: SubmitStatus;
  isDirty: boolean; // Track if the form has been modified
  externalContext?: T;
  fieldState: FieldState;
  layout: FormLayout;
  initialLayout: FormLayout;
}

export interface FormActions<T = unknown> {
  setFormId: (id: string) => void;
  setStatus: (status: FormStatus) => void;
  incrementSubmitCount: () => void;
  setLastSubmitStatus: (status: SubmitStatus) => void;
  markAsDirty: () => void;
  resetForm: () => void;
  setExternalContext: (context?: T) => void;
  patchFieldState: (
    fieldName: string,
    updates: Partial<FieldState[string]>
  ) => void;
  patchLayout: (fieldName: string, updates: Partial<Layout>) => void;
}
