import { createAsyncAction } from 'typesafe-actions';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';

export const login = createAsyncAction(
  '@AUTH/REQUEST_LOGIN_START',
  '@AUTH/REQUEST_LOGIN_SUCCESS',
  '@AUTH/REQUEST_LOGIN_FAILURE',
)<{ username: string; password: string }, any, HttpErrorResponseModel>();

export const getCurrentUser = createAsyncAction(
  '@AUTH/REQUEST_CURRENT_USER_START',
  '@AUTH/REQUEST_CURRENT_USER_SUCCESS',
  '@AUTH/REQUEST_CURRENT_USER_FAILURE',
)<void, any, HttpErrorResponseModel>();

export const logout = createAsyncAction(
  '@AUTH/REQUEST_LOGOUT_START',
  '@AUTH/REQUEST_LOGOUT_SUCCESS',
  '@AUTH/REQUEST_LOGOUT_FAILURE',
)<void, void, HttpErrorResponseModel>();
