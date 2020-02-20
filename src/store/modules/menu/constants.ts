import {createAsyncConstantCreator} from '../../utils/ActionUtility';

const createAsyncConstant = createAsyncConstantCreator('menu');

// Actions
export const [REQUEST_MENU, REQUEST_MENU_FINISHED] = createAsyncConstant('MENU');
