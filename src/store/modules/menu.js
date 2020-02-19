import { generateMenu, rebuildPath } from "../../components/Router/utils";
import {
  createThunkEffect,
  createConstantCreator,
  createThunkAction
} from "../utils/ActionUtils";
import { createDeepEqualSelector } from "../utilities";
import baseReducer from "../utils/baseReducer";
import { sortBy, reverse } from "lodash";

const createConstant = createConstantCreator("menu");

// Actions
const [REQUEST_MENU, REQUEST_MENU_FINISHED] = createConstant("MENU", true);

// Initial State
const initialState = {
  flatMenu: [],
  treeMenu: []
};

export default baseReducer(initialState, {
  [REQUEST_MENU_FINISHED](state, action) {
    return {
      ...state,
      flatMenu: reverse(sortBy(action.payload, route => route.path.length)),
      treeMenu: sortBy(generateMenu(action.payload), ["order", "id"])
    };
  }
});

export function getMenu() {
  return createThunkAction(
    REQUEST_MENU,
    {
      method: "GET",
      url: "/api/menu"
    },
    {
      redirect: [404, 403],
      postProcessPayload: rebuildPath
    }
  );
}

// Selectors
export const menuSelector = createDeepEqualSelector(
  ({ menu }) => menu.flatMenu,
  menu => menu
);

export const treeMenuSelector = createDeepEqualSelector(
  ({ menu }) => menu.treeMenu,
  menu => menu
);
