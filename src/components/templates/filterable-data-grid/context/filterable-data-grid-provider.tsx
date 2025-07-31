import React from 'react';
import { PropsWithChildren } from 'react';
import {
  FilterableDataGridActions,
  FilterableDataGridContextValue,
  FilterableDataGridState,
} from '../types';
import {
  defaultContextValue,
  FilterableDataGridContext,
} from './filterable-data-grid-context';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type FilterableDataGridRootProps = {};

function FilterableDataGridProvider({
  children,
}: PropsWithChildren<FilterableDataGridRootProps>) {
  // Initialize state with default values
  const [state, setState] = React.useState<FilterableDataGridState>(() => ({
    ...defaultContextValue.state,
  }));

  // Define empty actions for the context
  const actions = React.useMemo<FilterableDataGridActions>(
    () => ({}),
    [setState],
  );

  // Memoize the context value
  const contextValue = React.useMemo<FilterableDataGridContextValue>(
    () => ({ state, actions }),
    [state, actions],
  );

  return (
    <FilterableDataGridContext.Provider value={contextValue}>
      {children}
    </FilterableDataGridContext.Provider>
  );
}

export default FilterableDataGridProvider;
