type FormStatus = "idle" | "loading";
type SubmitStatus = "success" | "failure" | null;

export interface FormState {
  formId?: string;
  status: FormStatus;
  submitCount: number;
  lastSubmitStatus: SubmitStatus;
  isDirty: boolean; // Track if the form has been modified
}

export interface FormActions {
  setFormId: (id: string) => void;
  setStatus: (status: FormStatus) => void;
  incrementSubmitCount: () => void;
  setLastSubmitStatus: (status: SubmitStatus) => void;
  markAsDirty: () => void;
  resetForm: () => void;
}
