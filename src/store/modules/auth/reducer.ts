// Reducer

import baseReducer from '../../utils/baseReducer';
import { LOGIN_FINISHED, GET_CURRENT_USER_FINISHED, LOGOUT_FINISHED } from './constants';

const initialState: { [k: string]: any } = {
  current: null
};

export default baseReducer(initialState, {
  [LOGIN_FINISHED](state, action) {
    return {
      ...state,
      current: action.payload
    };
  },
  [LOGOUT_FINISHED](state, action) {
    return {
      ...state,
      current: null
    };
  },
  [GET_CURRENT_USER_FINISHED](state, action) {
    return {
      ...state,
      current: action.payload
    };
  }
});
