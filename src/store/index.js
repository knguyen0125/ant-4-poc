import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import createRootReducer from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

export const history = createBrowserHistory();

const configureStore = preloadedState => {
  return createStore(
    createRootReducer(history),
    preloadedState,
    composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk))
  );
};

export default configureStore;
