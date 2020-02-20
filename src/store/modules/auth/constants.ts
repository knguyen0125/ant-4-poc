import {createAsyncConstantCreator, createConstantCreator} from '../../utils/ActionUtility';

const createConstant = createConstantCreator('auth');
const createAsyncConstant = createAsyncConstantCreator('auth');

export const [LOGIN, LOGIN_FINISHED] = createAsyncConstant('LOGIN');
export const [GET_CURRENT_USER, GET_CURRENT_USER_FINISHED] = createAsyncConstant('GET_CURRENT_USER');
export const [LOGOUT, LOGOUT_FINISHED] = createAsyncConstant('LOGOUT');
