import { call, put, all, takeEvery } from 'redux-saga/effects';
import * as AuthActions from './actions';
import * as AuthServices from './services';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';

function* loginSaga(action: ReturnType<typeof AuthActions.login.request>) {
  const response = yield call(
    AuthServices.login,
    action.payload.username,
    action.payload.password,
  );

  if (response instanceof HttpErrorResponseModel) {
    yield put(AuthActions.login.failure(response));
  } else {
    yield put(AuthActions.login.success(response.data));
  }
}

function* logoutSaga() {
  const response = yield call(AuthServices.logout);

  if (response instanceof HttpErrorResponseModel) {
    yield put(AuthActions.logout.failure(response));
  } else {
    yield put(AuthActions.logout.success());
  }
}

function* getCurrentUserSaga() {
  const response = yield call(AuthServices.getCurrent);

  if (response instanceof HttpErrorResponseModel) {
    yield put(AuthActions.getCurrentUser.failure(response));
    yield put(AuthActions.logout.request());
  } else {
    yield put(AuthActions.getCurrentUser.success(response.data));
  }
}

export default function* authSaga() {
  yield all([
    takeEvery(AuthActions.login.request, loginSaga),
    takeEvery(AuthActions.logout.request, logoutSaga),
    takeEvery(AuthActions.getCurrentUser.request, getCurrentUserSaga),
  ]);
}
