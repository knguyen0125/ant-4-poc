import {
  createThunkAction,
  ThunkEffectMetadata
} from '../../utils/ActionUtility';
import { REQUEST_MENU } from './constants';

export function getMenu(meta: ThunkEffectMetadata = {}) {
  return createThunkAction(
    REQUEST_MENU,
    {
      redirectOnError: ['5xx'],
      ...meta
    },
    {
      method: 'GET',
      url: '/api/menu'
    }
  );
}
