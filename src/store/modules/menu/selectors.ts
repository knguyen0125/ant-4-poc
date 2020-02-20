import {Selector} from 'reselect';
import {createDeepEqualSelector} from '../../utils/SelectorUtility';
import IStore from '../../models/IStore';

export const selectFlatMenu: Selector<IStore, any[]> = createDeepEqualSelector(
  state => state.menu,
  menu => menu.flatMenu
);

export const selectTreeMenu: Selector<IStore, any[]> = createDeepEqualSelector(
  state => state.menu,
  menu => menu.treeMenu
);
