import { useRef } from "react";
import { FieldValues, Path } from "react-hook-form";
import { FormRef } from "./form-container";

export function useFormController<T extends FieldValues>() {
  const formRef = useRef<FormRef<T>>(null);

  const resetForm = () => formRef.current?.resetForm();
  const setFormValue = <K extends Path<T>>(name: K, value: T[K]) =>
    formRef.current?.setFormValue(name, value);
  const submitForm = async () => await formRef.current?.submitForm();
  const setFormLoading = (loading: boolean) =>
    formRef.current?.setFormLoading(loading);
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
