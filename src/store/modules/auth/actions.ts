import {createAction, createThunkAction, ThunkEffectMetadata} from '../../utils/ActionUtility';
import {LOGIN, GET_CURRENT_USER, LOGOUT} from './constants';

export const login = (username: string, password: string, meta: ThunkEffectMetadata = {}) => {
  return createThunkAction(
    LOGIN,
    meta,
    {
      url: '/api/auth/login',
      method: 'POST',
      data: {
        username,
        password
      }
    }
  );
};

export const getCurrentUser = (meta: ThunkEffectMetadata = {}) => {
  return createThunkAction(
    GET_CURRENT_USER,
    meta,
    {
      url: '/api/auth/current',
      method: 'GET',
    }
  );
};

export const logout = (meta: ThunkEffectMetadata = {}) => {
  return createThunkAction(
    LOGOUT,
    meta,
    {
      url: '/api/auth/logout',
      method: 'GET'
    }
  );
};
