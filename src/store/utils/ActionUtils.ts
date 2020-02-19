import axios, { AxiosRequestConfig } from "axios";
import { ActionCreator, Dispatch } from "redux";
import { push } from "connected-react-router";
import { notification } from "antd";
import { identity } from "lodash";

type Metadata = {
  postProcessPayload?: (payload: any) => any;
};

type ThunkEffectMetadata = {
  showNotification?: boolean;
  redirect?: boolean | number[];
} & Metadata;

export const createConstantCreator = (namespace: string) => (
  actionType: string,
  forThunkEffect = false
) => {
  if (!forThunkEffect) return `${namespace}/${actionType}`;

  return [
    `${namespace}/REQUEST_${actionType}`,
    `${namespace}/REQUEST_${actionType}_FINISHED`
  ];
};

export const createAction = (
  type: string,
  payload?: any,
  error: boolean = false,
  meta: Metadata = { postProcessPayload: identity }
) => {
  return { type, payload, error, meta };
};

const defaultThunkMeta = {
  redirect: false,
  showNotification: true
};

export const createThunkEffect = async (
  dispatch: Dispatch,
  actionType: string,
  options: AxiosRequestConfig,
  meta: ThunkEffectMetadata = defaultThunkMeta
) => {
  const realMeta = { ...defaultThunkMeta, ...meta };

  dispatch(createAction(actionType));

  try {
    const response = await axios.request(options);
    dispatch(
      createAction(`${actionType}_FINISHED`, response.data, false, realMeta)
    );
  } catch (error) {
    if (realMeta.showNotification) {
      notification.error({ message: error.response.data });
    }

    if (realMeta.redirect) {
      const status = error.response.status;

      const redirectTo =
        typeof realMeta.redirect === "boolean"
          ? [404, 403, 500, 501, 502, 503, 504]
          : realMeta.redirect;

      if (redirectTo.includes(status)) {
        dispatch(push(`/exceptions/${status}`));
      }
    }

    dispatch(
      createAction(`${actionType}_FINISHED`, error.response, true, realMeta)
    );
  }
};

export const createThunkAction = (
  actionType: string,
  options: AxiosRequestConfig,
  meta: ThunkEffectMetadata
) => {
  return async (dispatch: Dispatch) =>
    createThunkEffect(dispatch, actionType, options, meta);
};
