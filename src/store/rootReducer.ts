import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import menu from './modules/menu';
import loading from './modules/loading';
import error from './modules/error';
import auth from './modules/auth';

const createRootReducer = (history: History) => {
  const reducerMap = {
    router: connectRouter(history) as any,
    menu,
    auth,
    loading,
    error,
  };

  return combineReducers(reducerMap);
};

export default createRootReducer;
