import { call, put, all, takeEvery } from 'redux-saga/effects';
import * as MenuActions from './actions';
import * as MenuServices from './services';

function* getMenuSaga() {
  try {
    const response = yield call(MenuServices.getMenu);

    yield put(MenuActions.getMenu.success(response));
  } catch (err) {
    yield put(MenuActions.getMenu.failure(err));
  }
}

export default function* menuSaga() {
  yield all([
    takeEvery(MenuActions.getMenu.request, getMenuSaga),
  ]);
}
