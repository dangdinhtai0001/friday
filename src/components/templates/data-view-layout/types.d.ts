import { ButtonProps } from "@/components/atoms/button";
import React from "react";
// Define the runtime value for FilterOperator
export const FILTER_OPERATORS = [
  "eq",
  "neq",
  "gt",
  "gte",
  "lt",
  "lte",
  "like",
  "ilike",
  "is",
  "is_not",
  "in",
  "not_in",
  "between",
  "not_between",
] as const;

// Ensure the runtime value matches the type
export type FilterOperator = (typeof FILTER_OPERATORS)[number];

export interface Filter {
  id?: string;
  name: string;
  value: string;
  operator: FilterOperator;
}

export interface DataViewState {
  id?: string;
  filters?: Filter[];
}

export interface DataViewActions {
  addFilter: (filter: Filter) => void;
  removeFilter: (filter: Filter) => void;
  updateFilter: (id: string, updates: Partial<Filter>) => void;
  clearFilters: () => void;
  setFilters: (filters: Filter[]) => void;
}

export interface DataViewProviderProps {
  children: React.ReactNode;
}

export interface DataViewContextValue {
  state: DataViewState;
  actions: DataViewActions;
}

export interface DataViewLayoutProps {
  children?: React.ReactNode;
  additionalEventBindings?: Record<string, (...args: unknown[]) => void>;
}

export interface FilterContainerProps {
  children?: React.ReactNode;
}

export interface ActionContainerProps {
  children?: React.ReactNode;
}

export interface ActionTriggerProps {
  children?: React.ReactNode;
  label?: string;
  "event-name"?: string;
  "data-grid"?: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

export interface ButtonTriggerProps extends ActionTriggerProps, ButtonProps {}

export interface DialogTriggerProps extends ActionTriggerProps {
  title?: string;
  "trigger-class-name"?: string;
}

// --------------------------------------------------------------------

export enum DataViewEventNames {
  TRIGGER_FILTER = "triggerFilter",
}

export interface DataViewEventPayload {
  [DataViewEventNames.TRIGGER_FILTER]: undefined;
}

// --------------------------------------------------------------------

export interface DataViewCommands {
  getId: () => string;
}

export interface UseDataViewControlReturn {
  ref: React.RefObject<DataViewCommands | null>;
  getId: () => string | undefined;
}
