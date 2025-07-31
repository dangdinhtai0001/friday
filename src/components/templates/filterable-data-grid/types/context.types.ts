export type FilterableDataGridState = {
  filters: FilterExpression[];
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type FilterableDataGridActions = {};

export type FilterableDataGridContextValue = {
    state: FilterableDataGridState,
    actions: FilterableDataGridActions,
}

export type Operator = '=' | '!=' | '>' | '<' | '>=' | '<=' | 'in';

export type FilterExpression = {
  field: string;
  operator: Operator;
  value: string;
};
