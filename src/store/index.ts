import { createStore, applyMiddleware, Store } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import reduxFreeze from 'redux-freeze';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import {RootState} from 'typesafe-actions';
import createRootReducer from './rootReducer';
import rootSaga from './rootSaga';

export const history = createBrowserHistory();

type ConfigureStoreType = (preloadedState: Partial<RootState>) => Store<RootState>;

const configureStore: ConfigureStoreType = (preloadedState) => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    process.env.NODE_ENV === 'development' ? reduxFreeze : null!,
    routerMiddleware(history),
    sagaMiddleware,
  ].filter(Boolean);

  const store: Store<RootState> = createStore(
    createRootReducer(history),
    preloadedState as any,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
