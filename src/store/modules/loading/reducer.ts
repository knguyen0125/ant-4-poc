import IAction from '../../models/IAction';
import ILoadingState from './models/ILoadingState';

export const initialState: ILoadingState = {};

const loadingReducer = (state = initialState, action: IAction<any>) => {
  const isRequestType = action.type.includes('REQUEST_');
  if (!isRequestType) return state;

  const requestName = action.type.replace('_FINISHED', '');
  const isFinishedRequestType = action.type.includes('_FINISHED');

  return {
    ...state,
    [requestName]: !isFinishedRequestType
  };
};

export default loadingReducer;
