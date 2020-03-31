import * as HttpUtility from '../../utils/HttpUtility';

export const login = async (username: string, password: string) => {
  return HttpUtility.post('/api/auth/login', { username, password });
};

export const logout = async () => {
  return HttpUtility.get('/api/auth/logout');
};

export const getCurrent = async () => {
  return HttpUtility.get('/api/auth/current');
};
