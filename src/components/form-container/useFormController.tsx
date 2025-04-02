import { useRef } from "react";
import { FormContainerRef } from "./FormContainer";
import { FieldValues } from "react-hook-form";

export function useFormController<T extends FieldValues>() {
  const formRef = useRef<FormContainerRef<T>>(null);

  const resetForm = () => formRef.current?.resetForm();
  const setFormValue = (name: keyof T, value: any) => formRef.current?.setFormValue(name, value);
  const submitForm = async () => await formRef.current?.submitForm();
  const setFormLoading = (loading: boolean) => formRef.current?.setFormLoading(loading);
  const getFormValue = () => formRef.current?.getFormValue() || {};
  const validateForm = async () => await formRef.current?.validateForm();
  const getFieldsError = () => formRef.current?.getFieldsError() || {};

  return {
    formRef,
    resetForm,
    setFormValue,
    submitForm,
    setFormLoading,
    getFormValue,
    validateForm,
    getFieldsError,
  };
}