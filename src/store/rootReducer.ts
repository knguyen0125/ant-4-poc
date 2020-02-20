import { combineReducers, Reducer, ReducersMapObject } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import menu from './modules/menu';
import loading from './modules/loading';
import error from './modules/error';
import auth from './modules/auth';
import IStore from './models/IStore';

type CreateRootReducerType = (history: History) => Reducer<IStore>;

const createRootReducer: CreateRootReducerType = history => {
  const reducerMap: ReducersMapObject<IStore> = {
    router: connectRouter(history) as any,
    menu,
    auth,
    loading,
    error
  };

  return combineReducers(reducerMap);
};

export default createRootReducer;
