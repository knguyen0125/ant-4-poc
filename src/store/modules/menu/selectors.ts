import { Selector } from 'reselect';
import { createDeepEqualSelector } from '../../utils/SelectorUtility';
import { RootState } from 'typesafe-actions';

export const selectFlatMenu: Selector<
  RootState,
  any[]
> = createDeepEqualSelector(
  (state) => state.menu,
  (menu) => menu.flatMenu,
);

export const selectTreeMenu: Selector<
  RootState,
  any[]
> = createDeepEqualSelector(
  (state) => state.menu,
  (menu) => menu.treeMenu,
);
