import { createSelector, ParametricSelector } from 'reselect';
import { RootState } from 'typesafe-actions';

export const selectLoading: ParametricSelector<
RootState,
string[],
boolean
> = createSelector(
  (state) => state.loading,
  (_, actionTypes) => actionTypes,
  (loading, actionTypes) =>
    actionTypes.some((actionType) => loading[actionType]),
);
