import { useState } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

export interface UseSelectProps<TOption, TValue> {
  mode: "client" | "server"; // Determines whether to use client-side or server-side options
  initialOptions?: TOption[]; // Initial options for client mode
  initialValue?: TValue | TValue[]; // Initial selected value(s)
  fetchOptions?: () => Promise<TOption[]>; // Function to fetch options in server mode
}

export interface UseSelectReturns<TOption, TValue> {
  selectedValue?: TValue | TValue[];
  options: TOption[];
  isLoading: boolean;
  error: unknown;
  handleChange: (newValue: TValue | TValue[]) => void;
  resetSelection: () => void;
  addOption: (newOption: TOption) => void;
  removeOption: (optionToRemove: TOption) => void;
  refresh: () => Promise<void>;
}

function useSelect<TOption, TValue>({
  mode = "client",
  initialOptions = [],
  initialValue,
  fetchOptions,
}: UseSelectProps<TOption, TValue>): UseSelectReturns<TOption, TValue> {
  const queryKey = ["select-options", uuidv4()];

  // State for managing selected value(s)
  const [selectedValue, setSelectedValue] = useState<
    TValue | TValue[] | undefined
  >(initialValue);

  // State for managing options (client-side updates)
  const [localOptions, setLocalOptions] = useState<TOption[]>(initialOptions);

  // Query for fetching options in server mode
  const queryResult: UseQueryResult<TOption[], unknown> =
    mode === "server" && fetchOptions
      ? useQuery({
          queryKey,
          queryFn: fetchOptions,
          enabled: true, // Enabled only in server mode with fetchOptions
        })
      : undefined;

  const fetchedOptions = queryResult?.data || [];
  const isLoading = queryResult?.isLoading || false;
  const error = queryResult?.error;

  // Determine the options based on the mode
  const options = mode === "server" ? fetchedOptions : localOptions;

  // Handler to update the selected value(s)
  const handleChange = (newValue: TValue | TValue[]) => {
    if (Array.isArray(newValue)) {
      // For multi-select, ensure the value is always an array
      setSelectedValue([...newValue] as TValue[]);
    } else {
      // For single-select, ensure the value is a single item
      setSelectedValue(newValue as TValue);
    }
  };

  // Reset the selected value(s) to the initial value
  const resetSelection = () => {
    setSelectedValue(initialValue);
  };

  // Add new options dynamically (useful for client-side updates)
  const addOption = (newOption: TOption) => {
    if (mode === "client") {
      setLocalOptions((prevOptions) => [...prevOptions, newOption]);
    } else {
      console.warn(
        "addOption is only supported in client mode. Ignoring operation in server mode.",
      );
    }
  };

  // Remove an option dynamically
  const removeOption = (optionToRemove: TOption) => {
    if (mode === "client") {
      setLocalOptions((prevOptions) =>
        prevOptions.filter((option) => option !== optionToRemove),
      );
    } else {
      console.warn(
        "removeOption is only supported in client mode. Ignoring operation in server mode.",
      );
    }
  };

  // Trigger the refetch
  const refresh = async () => {
    if (mode === "server" && queryResult?.refetch) {
      await queryResult.refetch();
    } else {
      console.warn("refresh is only supported in server mode.");
    }
  };

  return {
    selectedValue,
    options,
    isLoading,
    error,
    handleChange,
    resetSelection,
    addOption,
    removeOption,
    refresh,
  };
}

export { useSelect };