import { AxiosRequestConfig } from 'axios';
import { isFunction, omit } from 'lodash';
import { notification } from 'antd';
import { ReduxDispatch } from '../models/ReduxProps';
import HttpErrorResponseModel from '../models/HttpErrorResponseModel';
import IAction from '../models/IAction';
import { _request } from './HttpUtility';

type Metadata = {};

type ErrorStatus = '4xx' | '5xx' | '404' | '403';

export type ThunkEffectMetadata = {
  showNotificationOnError?: boolean;
  redirectOnError?: boolean | ErrorStatus[];
} & Metadata;

const defaultThunkMeta: ThunkEffectMetadata = {
  redirectOnError: ['5xx'],
  showNotificationOnError: true
};

type Effect<P = any> = (...args: any[]) => Promise<P | HttpErrorResponseModel>;

type EffectOrAxiosOptions<P = any> = AxiosRequestConfig | Effect<P>;

export async function createThunkEffect<P = any>(
  dispatch: ReduxDispatch<undefined | P | HttpErrorResponseModel>,
  actionType: string,
  meta: ThunkEffectMetadata = {},
  effectOrOptions: EffectOrAxiosOptions<P>,
  ...args: any[]
): Promise<P | HttpErrorResponseModel> {
  const metaWithDefault = {
    ...defaultThunkMeta,
    ...meta
  };
  dispatch(createAction(actionType));

  let model: P | HttpErrorResponseModel;
  if (isFunction(effectOrOptions)) {
    model = (await effectOrOptions(...args)) as P | HttpErrorResponseModel;
  } else {
    const restRequest = {
      url: effectOrOptions.url,
      method: effectOrOptions.method
    };
    const config = omit(effectOrOptions, ['url', 'method']);
    model = (await _request(restRequest, config)) as P | HttpErrorResponseModel;
  }
  // const model: P | HttpErrorResponseModel = await effect(...args);
  const isError: boolean = model instanceof HttpErrorResponseModel;

  if (isError && metaWithDefault) {
    if (metaWithDefault.showNotificationOnError) {
      notification.error({
        message: (model as HttpErrorResponseModel).message
      });
    }

    if (metaWithDefault.redirectOnError) {
      //
    }
  }

  dispatch(
    createAction<P | HttpErrorResponseModel>(
      `${actionType}_FINISHED`,
      model,
      isError,
      metaWithDefault
    )
  );

  return model;
}

export function createAction<T = undefined>(
  type: string,
  payload?: T,
  error: boolean = false,
  meta: any = null
): IAction<T> {
  return { type, payload, error, meta };
}

export const createThunkAction = <P = any>(
  actionType: string,
  meta: ThunkEffectMetadata,
  effectOrOptions: EffectOrAxiosOptions<P>,
  ...args: any[]
) => {
  return async (
    dispatch: ReduxDispatch<undefined | P | HttpErrorResponseModel>
  ) => createThunkEffect(dispatch, actionType, meta, effectOrOptions, ...args);
};

export const createConstantCreator = (namespace: string) => (
  actionType: string
) => {
  return `${namespace}/${actionType}`;
};

export const createAsyncConstantCreator = (namespace: string) => (
  actionType: string
) => [
  `${namespace}/REQUEST_${actionType}`,
  `${namespace}/REQUEST_${actionType}_FINISHED`
];
