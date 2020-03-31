import { createAction } from 'typesafe-actions';

export const removeById = createAction('@ERROR/REMOVE')<string>();

export const clearAll = createAction('@ERROR/CLEAR_ALL')<void>();
