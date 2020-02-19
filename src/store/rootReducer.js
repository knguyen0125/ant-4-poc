import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import menuReducer from "./modules/menu";
import loadingReducer from "./modules/loading";
import errorReducer from "./modules/error";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    menu: menuReducer,
    loading: loadingReducer,
    error: errorReducer
  });

export default createRootReducer;
