import { reverse, sortBy } from 'lodash';
import baseReducer from '../../utils/baseReducer';
import { generateMenu, rebuildPath } from '../../../components/Router/utils';
import { REQUEST_MENU_FINISHED } from './constants';

const initialState: { [k: string]: any } = {
  flatMenu: [],
  treeMenu: []
};

export default baseReducer(initialState, {
  [REQUEST_MENU_FINISHED](state, action) {
    const rebuiltPath = rebuildPath(action.payload.data);

    return {
      ...state,
      flatMenu: reverse(sortBy(rebuiltPath, route => route.path.length)),
      treeMenu: sortBy(generateMenu(rebuiltPath), ['order', 'id'])
    };
  }
});
