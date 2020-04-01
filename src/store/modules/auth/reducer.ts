// Reducer

import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';
import * as AuthActions from './actions';

const current = createReducer(null as any)
  .handleAction(AuthActions.login.success, (state, action) => action.payload)
  .handleAction(
    AuthActions.getCurrentUser.success,
    (state, action) => action.payload,
  )
  .handleAction(AuthActions.logout.success, () => null);

export default combineReducers({
  current,
});
