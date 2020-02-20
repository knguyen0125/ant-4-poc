import {Reducer} from 'redux';
import IAction from '../../models/IAction';
import { CLEAR_ALL, REMOVE } from './constants';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import IErrorState from './models/IErrorState';


const initialState: IErrorState = {};

// type ErrorReducer = (state: IErrorState, action: IAction<any>) => Reducer<IErrorState>

const errorReducer: Reducer<IErrorState> = (state = initialState, action: IAction<any>) => {
  if (action.type === REMOVE) {
    return Object.entries(state).reduce(
      (newState: object, [key, value]: [string, HttpErrorResponseModel]) => {
        if (value.id !== action.payload) {
          // @ts-ignore
          newState[key] = value;
        }

        return newState;
      },
      {}
    );
  }

  if (action.type === CLEAR_ALL) {
    return initialState;
  }

  const isFinishedRequestType = action.type.includes('_FINISHED');
  const isStartRequestType = action.type.includes('REQUEST_') && !isFinishedRequestType;

  if (isStartRequestType) {
    const {[`${action.type}_FINISHED`]: value, ...stateWithoutFinishedType}  = state;

    return stateWithoutFinishedType;
  }

  const isError = isFinishedRequestType && Boolean(action.error);
  if (!isError) {
    return state;
  }

  return {
    ...state,
    [action.type]: action.payload
  };
};

export default errorReducer;
