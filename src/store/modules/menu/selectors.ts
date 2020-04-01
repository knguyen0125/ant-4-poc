import { Selector } from 'reselect';
import { RootState } from 'typesafe-actions';
import { createDeepEqualSelector } from '../../utils/SelectorUtility';

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
