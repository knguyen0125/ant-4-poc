import {
  TypedUseSelectorHook,
  useSelector as useGenericSelector,
  useDispatch as useGenericDispatch,
} from 'react-redux';
import { RootState, RootAction } from 'typesafe-actions';
import { Dispatch } from 'redux';

export const useSelector: TypedUseSelectorHook<RootState> = useGenericSelector;
export const useDispatch: () => Dispatch<RootAction> = useGenericDispatch;
