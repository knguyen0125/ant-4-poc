import {Selector} from 'reselect';
import {createDeepEqualSelector} from '../../utils/SelectorUtility';
import IStore from '../../models/IStore';

export const selectCurrentUser: Selector<IStore, any> = createDeepEqualSelector(
  state => state.auth,
  auth => auth.current
);

export const selectLoggedIn: Selector<IStore, boolean> = createDeepEqualSelector(
  state => state.auth,
  auth => Boolean(auth.current)
);
