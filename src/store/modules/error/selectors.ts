import { createSelector, ParametricSelector } from 'reselect';
import IErrorState from './models/IErrorState';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import { RootState } from 'typesafe-actions';

export const selectRawErrors: ParametricSelector<
  RootState,
  string[],
  IErrorState
> = createSelector(
  (state) => state.error,
  (_, actionTypes) => actionTypes,
  _selectRawErrors,
);

export const selectErrorText: ParametricSelector<
  RootState,
  string[],
  string
> = createSelector(
  (state) => state.error,
  (state, actionTypes) => actionTypes,
  _selectErrorText,
);

export const selectHasErrors: ParametricSelector<
  RootState,
  string[],
  boolean
> = createSelector(
  (state) => state.error,
  (state, actionTypes) => actionTypes,
  _hasErrors,
);

/**
 * Returns a new object with the keys being the finished action type
 * (e.g. "SomeAction.REQUEST_*_FINISHED") and the value being a
 * HttpErrorResponseModel.
 */
function _selectRawErrors(
  errorState: IErrorState,
  actionTypes: string[],
): IErrorState {
  return actionTypes.reduce((partialState: object, actionType: string) => {
    const model: HttpErrorResponseModel = errorState[actionType];

    if (model) {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      partialState[actionType] = model;
    }

    return partialState;
  }, {});
}

/**
 * Finds any errors matching the array of actionTypes and combines all error
 * messages in to a single string.
 */
function _selectErrorText(
  errorState: IErrorState,
  actionTypes: string[],
): string {
  const errorList: string[] = actionTypes.reduce(
    (errorMessages: string[], actionType: string) => {
      const model: HttpErrorResponseModel = errorState[actionType];

      if (model) {
        const { message, errors } = model;
        const arrayOfErrors: string[] = errors.length ? errors : [message];

        return errorMessages.concat(arrayOfErrors);
      }

      return errorMessages;
    },
    [],
  );

  return errorList.join(', ');
}

/**
 * Returns true or false if there are errors found matching the array of actionTypes.
 */
function _hasErrors(errorState: IErrorState, actionTypes: string[]): boolean {
  return (
    actionTypes
      .map((actionType: string) => errorState[actionType])
      .filter(Boolean).length > 0
  );
}
