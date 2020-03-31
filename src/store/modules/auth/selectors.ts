import { createSelector, ParametricSelector, Selector } from 'reselect';
import { createDeepEqualSelector } from '../../utils/SelectorUtility';
import { RootState } from 'typesafe-actions';

export const selectCurrentUser: Selector<
  RootState,
  any
> = createDeepEqualSelector(
  (state) => state.auth,
  (auth) => auth.current,
);

export const selectLoggedIn: Selector<
  RootState,
  boolean
> = createDeepEqualSelector(
  (state) => state.auth,
  (auth) => Boolean(auth.current),
);

export const x: ParametricSelector<RootState, boolean, any> = createSelector(
  (state) => state.error,
  (_, props) => props,
  (error, props) => props
);
