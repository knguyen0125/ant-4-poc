import IAction from '../../models/IAction';
import * as ActionUtility from '../../utils/ActionUtility';
import {CLEAR_ALL, REMOVE} from './constants';

export function removeById(id: string): IAction<string> {
  return ActionUtility.createAction(REMOVE, id);
}

export function clearAll(): IAction<undefined> {
  return ActionUtility.createAction(CLEAR_ALL);
}
