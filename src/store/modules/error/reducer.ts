import { Reducer } from 'redux';
import * as ErrorActions from './actions';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import IErrorState from './models/IErrorState';
import { getType } from 'typesafe-actions';

const initialState: IErrorState = {};

const errorReducer: Reducer<IErrorState> = (state = initialState, action) => {
  if (action.type === getType(ErrorActions.removeById)) {
    return Object.entries(state).reduce(
      (newState: object, [key, value]: [string, HttpErrorResponseModel]) => {
        if (value.id !== action.payload) {
          // @ts-ignore
          newState[key] = value;
        }

        return newState;
      },
      {},
    );
  }

  if (action.type === getType(ErrorActions.clearAll)) {
    return initialState;
  }

  const isFinishedRequestType =
    action.type.includes('_SUCCESS') || action.type.includes('_FAILURE');
  const isStartRequestType =
    action.type.includes('REQUEST_') && !isFinishedRequestType;

  if (isStartRequestType) {
    const { [`${action.type}`]: value, ...stateWithoutFinishedType } = state;

    return stateWithoutFinishedType;
  }

  const isError =
    isFinishedRequestType && action.payload instanceof HttpErrorResponseModel;
  if (!isError) {
    return state;
  }

  const requestName = action.type
    .replace('_SUCCESS', '_START')
    .replace('_FAILURE', '_START');

  return {
    ...state,
    [requestName]: action.payload,
  };
};

export default errorReducer;
