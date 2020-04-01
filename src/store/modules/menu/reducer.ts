import { reverse, sortBy } from 'lodash';
import { createReducer } from 'typesafe-actions';
import { generateMenu, rebuildPath } from '../../../components/Router/utils';
import * as MenuActions from './actions';

export default createReducer({
  flatMenu: [] as any[],
  treeMenu: [] as any[],
}).handleAction(MenuActions.getMenu.success, (state, action) => {
  const rebuiltPath = rebuildPath(action.payload.data);

  return {
    ...state,
    flatMenu: reverse(sortBy(rebuiltPath, (route) => route.path.length)),
    treeMenu: sortBy(generateMenu(rebuiltPath), ['order', 'id']),
  };
});
