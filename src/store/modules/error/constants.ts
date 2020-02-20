import {createConstantCreator} from '../../utils/ActionUtility';

const createConstant = createConstantCreator('@@error');

export const REMOVE = createConstant('REMOVE');
export const CLEAR_ALL = createConstant('CLEAR_ALL');

