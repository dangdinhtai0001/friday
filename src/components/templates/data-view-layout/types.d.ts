import React from "react";

export interface DataViewState {
  id?: string;
}

export interface DataViewActions {
  id?: string;
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
}

export interface FilterContainerProps {
  children?: React.ReactNode;
}
