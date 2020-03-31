import * as HttpUtility from '../../utils/HttpUtility';

export const getMenu = async () => {
  return HttpUtility.get('/api/menu');
};

