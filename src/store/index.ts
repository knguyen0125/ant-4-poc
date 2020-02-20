import { createStore, applyMiddleware, Store } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import reduxFreeze from 'redux-freeze';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from './rootReducer';
import IStore from './models/IStore';

export const history = createBrowserHistory();

type ConfigureStoreType = (preloadedState: Partial<IStore>) => Store<IStore>;

const configureStore: ConfigureStoreType = (preloadedState) => {
  const middlewares = [
    process.env.NODE_ENV === 'development' ? reduxFreeze : null!,
    routerMiddleware(history),
    thunk
  ].filter(Boolean);

  const store: Store<IStore> = createStore(
    createRootReducer(history),
    preloadedState as any,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  return store;
};

export default configureStore;
