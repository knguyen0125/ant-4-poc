import { createAsyncAction } from 'typesafe-actions';
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";

export const getMenu = createAsyncAction(
  '@MENU/REQUEST_GET_MENU_START',
  '@MENU/REQUEST_GET_MENU_SUCCESS',
  '@MENU/REQUEST_GET_MENU_FAILURE',
)<void, any, HttpErrorResponseModel>();

