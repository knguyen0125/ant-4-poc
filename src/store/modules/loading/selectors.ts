import {createSelector, ParametricSelector}  from 'reselect';
import ILoadingState from './models/ILoadingState';

function _selectLoading(requestingState: ILoadingState, actionTypes: string[]): boolean {
  return actionTypes.some((actionType: string) => requestingState[actionType]);
}

export const selectLoading: ParametricSelector<any, string[], boolean> = createSelector(
  (state: any) => state.loading,
  (state: any, actionTypes: string[]) => actionTypes,
  _selectLoading
);

