import { Reducer } from 'redux';
import ILoadingState from './models/ILoadingState';

export const initialState: ILoadingState = {};

const loadingReducer: Reducer<ILoadingState> = (
  state = initialState,
  action,
) => {
  const isRequestType = action.type.includes('REQUEST_');
  if (!isRequestType) return state;

  const requestName = action.type.replace('_SUCCESS', '_START').replace('_FAILURE', '_START');
  const isFinishedRequestType = action.type.includes('_SUCCESS') || action.type.includes('_FAILURE');

  return {
    ...state,
    [requestName]: !isFinishedRequestType,
  };
};

export default loadingReducer;
